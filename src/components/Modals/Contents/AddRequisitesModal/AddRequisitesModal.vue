<template>
  <Modal width="560px" padding="24px" title="Добавить реквизиты">
    <template #content>
      <div class="add-requisites-modal">
        <div class="add-requisites-modal__content">
          <Select title="Валюта" :items="wallets" :selected-item="selectedWallet"/>
          <Select title="Способ оплаты" :items="paymentMethods" :selected-item="selectedPaymentMethod"/>
          <Select title="Реквизиты" :items="requisites" :selected-item="selectedRequisites"/>
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
  onMounted,
  reactive,
  Ref,
  ref
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";

const wallets = reactive([
    { id: 1, name: 'RUB' }
]);
const paymentMethods = reactive([
    { id: 1, name: 'Сбербанк' }
]);
const requisites = reactive([
    { id: 1, name: '4521 4714 8978 0000' }
]);

const selectedWallet: Ref<ISelect | null> = ref(null);
const selectedPaymentMethod: Ref<ISelect | null> = ref(null);
const selectedRequisites: Ref<ISelect | null> = ref(null);

onMounted(() => {
  selectedWallet.value = wallets[0];
  selectedPaymentMethod.value = paymentMethods[0];
  selectedRequisites.value = requisites[0];
});
</script>

<style scoped lang="scss">
@import "addRequisitesModal";
</style>