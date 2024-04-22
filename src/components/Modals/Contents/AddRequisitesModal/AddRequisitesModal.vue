<template>
  <Modal width="560px" padding="24px" title="Добавить реквизиты">
    <template #content>
      <div class="add-requisites-modal">
        <div class="add-requisites-modal__content">
          <Select
              title="Валюта"
              :items="wallets"
              :selected-item="selectedWallet"
          />
          <Select
              title="Способ оплаты"
              :items="paymentMethods"
              :selected-item="selectedPaymentMethod"
          />
          <MyInput
              type="number"
              title="Реквизиты"
              :value="cardNumber"
              @input-value="setCardNumber"
          />
        </div>

        <div class="add-requisites-modal__buttons">
          <MyButton type="neutral-btn" size="big" name="Отмена" width="100%"/>
          <MyButton size="big" name="Добавить" width="100%"/>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modals/Modal.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import Select from "@/components/UI/Select/Select.vue";
import {
  computed,
  ComputedRef,
  onMounted,
  Ref,
  ref
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import { IPaymentMethod } from "@/interfaces/store/modules/payment-methods.interface.ts";
import { useStore } from "vuex";
import MyInput from "@/components/UI/MyInput/MyInput.vue";

const store = useStore();

const wallets: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const paymentMethods: ComputedRef<ISelect[]> = computed(() =>
    store.state.paymentMethods.paymentMethods.map((method: IPaymentMethod) => ({ id: method.id, name: method.name }))
);

const selectedWallet: Ref<ISelect | null> = ref(null);
const selectedPaymentMethod: Ref<ISelect | null> = ref(null);
const cardNumber = ref('');

const setCardNumber = (value: string) => {
  cardNumber.value = value;
}

onMounted(() => {
  selectedWallet.value = wallets.value[0];
  selectedPaymentMethod.value = paymentMethods.value[0];
});
</script>

<style scoped lang="scss">
@import "addRequisitesModal";
</style>