<template>
  <Modal width="560px" padding="24px" title="Вывод средств" @close-modal="emit('close-modal')">
    <template #content>
      <div class="withdrawal-funds-modal">
        <div class="withdrawal-funds-modal__content">
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
              :value="withdrawalAmount"
              @input-value="(value: string) => withdrawalAmount = value"
              @all="withdrawalAmount = String(props.selectedWallet?.realAmount)"
          />
        </div>
        <div class="withdrawal-funds-modal__buttons">
          <MyButton
              type="neutral-btn"
              size="big"
              name="Отмена"
              width="100%"
              @click="emit('close-modal')"
          />
          <MyButton
              size="big"
              name="Вывести"
              width="100%"
              @click="withdrawal"
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
  ref,
  Ref
} from "vue";
import {
  IInteractionWithWallet,
  IWallet
} from "@/interfaces/store/modules/profile.interface.ts";
import { useStore } from "vuex";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import Select from "@/components/UI/Select/Select.vue";
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
const withdrawalAmount = ref('');

const wallets: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.innerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);

const selectWallet = (wallet: ISelect) => {
  selectedWallet.value = wallet
}

const withdrawal = async () => {
  if (selectedWallet.value && withdrawalAmount.value) {
    const data: IInteractionWithWallet = {
      amount: +withdrawalAmount.value,
      action: 'topup',
      currency: selectedWallet.value?.name
    }
    await store.dispatch('profile/withdrawWallet', data)
    emit('close-modal')
  }
}

onMounted(() => {
  selectedWallet.value = wallets.value.find(wallet => wallet.name === props.selectedWallet?.currency) ?? wallets.value[0]
})
</script>

<style scoped lang="scss">
@import "withdrawalFundsModal";
</style>