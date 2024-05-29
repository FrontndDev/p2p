<template>
  <Modal width="560px" padding="24px" title="Вывод средств" @close-modal="emit('close-modal')">
    <template #content>
      <div class="withdrawal-funds-modal">
        <div class="withdrawal-funds-modal__content">
          <Select
              class="no-media"
              title="Валюта"
              :items="wallets"
              :selected-item="selectedWalletForSelect"
              :is-currency="true"
              @select="selectWallet"
          />
          <MyInput
              type="number"
              class="no-media"
              title="Сумма для вывода"
              :wallet="props.selectedWallet?.currency"
              :value="withdrawalAmount"
              @input-value="(value: string) => withdrawalAmount = value"
              @all="withdrawalAmount = selectedWallet.realAmount"
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
  PropType,
  ref,
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

const emit = defineEmits(['close-modal', 'select-wallet']);

const store = useStore();

const withdrawalAmount = ref('');

const wallets: ComputedRef<ISelect[]> = computed(() => Object.values(store.state.profile.profile.wallets).map((wallet: IWallet) => ({
  id: wallet.id,
  name: wallet.currency
})));

const selectedWalletForSelect = computed(() => ({
  id: props.selectedWallet.id,
  name: props.selectedWallet.currency
}));

const selectWallet = (wallet: ISelect) => {
  const selectedWallet = store.state.profile.profile.wallets[wallet.name]

  if (+withdrawalAmount.value > +selectedWallet.realAmount) {
    withdrawalAmount.value = String(selectedWallet.realAmount)
  }
  emit('select-wallet', selectedWallet);
}

const withdrawal = async () => {
  if (withdrawalAmount.value) {
    const data: IInteractionWithWallet = {
      amount: +withdrawalAmount.value,
      action: 'topup',
      currency: props.selectedWallet.currency
    }
    const response = await store.dispatch('profile/withdrawWallet', data)
    if (response?.result === 'success') emit('close-modal')
  }
}
</script>

<style scoped lang="scss">
@import "withdrawalFundsModal";
</style>