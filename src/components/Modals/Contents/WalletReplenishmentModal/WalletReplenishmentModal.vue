<template>
  <Modal width="560px" padding="24px" title="Пополнение кошелька" @close-modal="emit('close-modal')">
    <template #content>
      <div class="wallet-replenishment-modal">
        <div class="wallet-replenishment-modal__content">
          <Select
              class="no-media"
              title="Валюта"
              :items="wallets"
              :selected-item="selectedWallet"
              @select="selectWallet"
          />
          <MyInput
              type="number"
              class="no-media"
              title="Сумма для пополнения"
              :wallet="props.selectedWallet?.currency"
              :value="replenishmentAmount"
              @input-value="(value: string) => replenishmentAmount = value"
              @all="replenishmentAmount = String(props.selectedWallet?.realAmount)"
          />
        </div>
        <div class="wallet-replenishment-modal__buttons">
          <MyButton
              type="neutral-btn"
              size="big"
              name="Отмена"
              width="100%"
              @click="emit('close-modal')"
          />
          <MyButton
              size="big"
              name="Пополнить"
              width="100%"
              @click="replenish"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modals/Modal.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import {
  computed,
  ComputedRef,
  onMounted,
  PropType,
  Ref,
  ref,
} from "vue";
import {
  IInteractionWithWallet,
  IWallet
} from "@/interfaces/store/modules/profile.interface.ts";
import Select from "@/components/UI/Select/Select.vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import { useStore } from "vuex";
import MyInput from "@/components/UI/MyInput/MyInput.vue";

const props = defineProps({
  selectedWallet: {
    type: Object as PropType<IWallet>,
    required: true,
  }
});

const emit = defineEmits(['close-modal']);

const store = useStore();

let selectedWallet: Ref<ISelect | null> = ref(null);
const replenishmentAmount = ref('');

const wallets: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.innerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);

const selectWallet = (wallet: ISelect) => {
  selectedWallet.value = wallet
}

const replenish = async () => {
  if (selectedWallet.value && replenishmentAmount.value) {
    const data: IInteractionWithWallet = {
      amount: +replenishmentAmount.value,
      action: 'topup',
      currency: selectedWallet.value?.name
    }
    await store.dispatch('profile/topUpWallet', data)
    emit('close-modal')
  }
}

onMounted(() => {
  selectedWallet.value = wallets.value.find(wallet => wallet.name === props.selectedWallet?.currency) ?? wallets.value[0]
})
</script>

<style scoped lang="scss">
@import "walletReplenishmentModal";
</style>