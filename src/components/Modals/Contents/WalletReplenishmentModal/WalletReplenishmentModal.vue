<template>
  <Modal width="560px" padding="24px" title="Пополнение кошелька" @close-modal="emit('close-modal')">
    <template #content>
      <div class="wallet-replenishment-modal">
        <div class="wallet-replenishment-modal__content">
          <Select
              class="no-media"
              title="Валюта"
              :items="wallets"
              :selected-item="selectedWalletForSelect"
              @select="selectWallet"
          />
          <MyInput
              type="number"
              class="no-media"
              title="Сумма для пополнения"
              :wallet="props.selectedWallet.currency"
              :value="replenishmentAmount"
              @input-value="(value: string) => replenishmentAmount = value"
              @all="replenishmentAmount = selectedSystemWallet.amount"
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
  PropType,
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

const emit = defineEmits(['close-modal', 'select-wallet']);

const store = useStore();

const replenishmentAmount = ref('');

const wallets: ComputedRef<ISelect[]> = computed(() => Object.values(store.state.profile.profile.systemWallets).map((wallet: IWallet, idx) => ({
  id: idx + 1,
  name: wallet.currency
})));

const selectedSystemWallet = computed(() => store.state.profile.profile.systemWallets[props.selectedWallet.currency])

const selectedWalletForSelect = computed(() => ({
  id: props.selectedWallet.id,
  name: props.selectedWallet.currency
}));

const selectWallet = (wallet: ISelect) => {
  const selectedWallet = store.state.profile.profile.wallets[wallet.name];

  if (+replenishmentAmount.value > +selectedSystemWallet.value.amount) {
    replenishmentAmount.value = String(selectedSystemWallet.value.amount)
  }
  emit('select-wallet', selectedWallet);
}

const replenish = async () => {
  if (replenishmentAmount.value) {
    const data: IInteractionWithWallet = {
      amount: +replenishmentAmount.value,
      action: 'topup',
      currency: props.selectedWallet.currency
    }
    await store.dispatch('profile/topUpWallet', data)
    emit('close-modal')
  }
}
</script>

<style scoped lang="scss">
@import "walletReplenishmentModal";
</style>