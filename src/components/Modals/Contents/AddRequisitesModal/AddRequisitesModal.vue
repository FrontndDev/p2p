<template>
  <Modal width="560px" padding="24px" title="Добавить реквизиты" @close-modal="emit('close-modal')">
    <template #content>
      <div class="add-requisites-modal">
        <div class="add-requisites-modal__content">
          <Select
              title="Валюта"
              :items="wallets"
              :selected-item="selectedWallet"
              :is-currency="true"
              @select="selectWallet"
          />
          <Select
              title="Способ оплаты"
              :items="paymentMethods"
              :selected-item="selectedPaymentMethod"
              @select="(item: ISelect) => selectedPaymentMethod = item"
          />
          <MyInput
              type="tel"
              title="Реквизиты"
              :value="cardNumber"
              @input-value="setCardNumber"
          />
        </div>

        <div class="add-requisites-modal__buttons">
          <MyButton
              type="neutral-btn"
              size="big"
              name="Отмена"
              width="100%"
              @click="emit('close-modal')"
          />
          <MyButton
              :disabled="requestInProcess"
              size="big"
              name="Добавить"
              width="100%"
              @click="addRequisite"
          />
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
  PropType,
  Ref,
  ref,
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import { IPaymentMethod } from "@/interfaces/store/modules/payment-methods.interface.ts";
import { useStore } from "vuex";
import MyInput from "@/components/UI/MyInput/MyInput.vue";
import { ICreateRequisiteParams } from "@/interfaces/store/modules/requisites.interface.ts";
import { getPaymentMethodsByCurrency } from "@/api";
import { useShowMessage } from "@/composables/useShowMessage.ts";

const props = defineProps({
  selectedOuterCurrency: {
    type: Object as PropType<ISelect>,
  }
});

const emit = defineEmits(['close-modal']);

const store = useStore();

const requestInProcess = ref(false);

const wallets: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
let paymentMethods: Ref<ISelect[]> = ref([]);

const selectedWallet: Ref<ISelect | null> = ref(null);
const selectedPaymentMethod: Ref<ISelect | null> = ref(null);
const cardNumber = ref('');

const setPaymentMethods = async () => {
  if (selectedWallet.value) {
    const response = await getPaymentMethodsByCurrency(selectedWallet.value?.name)
    paymentMethods.value = response.data.payment_methods.map((method: IPaymentMethod) => ({ id: method.id, name: method.name }))
    selectedPaymentMethod.value = paymentMethods.value[0]
  }
}

const setCardNumber = (value: string) => {
  cardNumber.value = value;
}

const selectWallet = (item: ISelect) => {
  selectedWallet.value = item
  setPaymentMethods()
}

const addRequisite = async () => {
  if (cardNumber.value.length < 5) {
    useShowMessage('red', 'Минимальная длина реквизита 5 символов')
    return
  }

  if (selectedWallet.value && selectedPaymentMethod.value && cardNumber.value && !requestInProcess.value) {
    requestInProcess.value = true
    const data: ICreateRequisiteParams = {
      requisite: cardNumber.value.replace(/\s+/g, ''),
      currency: selectedWallet.value?.name,
      payment_method: selectedPaymentMethod.value?.id
    }
    const response = await store.dispatch('requisites/createRequisite', data)
    console.log('response', response)

    requestInProcess.value = false
    if (response?.data?.error_code === undefined) {
      emit('close-modal')
    }
  }
}

onMounted(async () => {
  selectedWallet.value = props.selectedOuterCurrency ?? wallets.value[0];
  await setPaymentMethods()
  selectedPaymentMethod.value = paymentMethods.value[0];
});
</script>

<style scoped lang="scss">
@import "addRequisitesModal";
</style>