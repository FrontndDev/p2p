<template>
  <Modal width="560px" padding="24px" title="Редактировать реквизиты" @close-modal="emit('close-modal')">
    <template #content>
      <div class="edit-requisites-modal">
        <div class="edit-requisites-modal__content">
          <Select
              title="Валюта"
              :items="wallets"
              :selected-item="selectedWallet"
              @select="selectWallet"
          />
          <Select
              title="Способ оплаты"
              :items="paymentMethods"
              :selected-item="selectedPaymentMethod"
              @select="(item: ISelect) => selectedPaymentMethod = item"
          />
          <MyInput
              type="number"
              title="Реквизиты"
              :value="cardNumber"
              @input-value="setCardNumber"
          />
        </div>

        <div class="edit-requisites-modal__buttons">
          <MyButton
              type="neutral-btn"
              size="big"
              name="Удалить"
              width="100%"
              @click="deleteRequisite"
          />
          <MyButton
              :disabled="requestInProcess"
              size="big"
              name="Сохранить"
              width="100%"
              @click="editRequisite"
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
import { getPaymentMethodsByCurrency } from "@/api";
import { IRequisite } from "@/interfaces/store/modules/profile.interface.ts";
import { IUpdateRequisiteParams } from "@/interfaces/store/modules/requisites.interface.ts";

const props = defineProps({
  selectedRequisite: {
    type: Object as PropType<IRequisite>,
    required: true,
  }
});

const emit = defineEmits(['close-modal']);

const store = useStore();

const requestInProcess = ref(false);
let paymentMethods: Ref<ISelect[]> = ref([]);

const wallets: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
//
const selectedRequisiteCurrency: ComputedRef<ISelect | undefined> = computed(() =>
    wallets.value.find(wallet => wallet.name === props.selectedRequisite?.currency)
);
const selectedRequisitePaymentMethod: ComputedRef<ISelect | undefined> = computed(() =>
    paymentMethods.value.find(method => method.name === props.selectedRequisite?.paymentMethod)
);

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

const deleteRequisite = () => {
  store.dispatch('requisites/deleteRequisite', props.selectedRequisite?.id)
  emit('close-modal')
}

const editRequisite = () => {
  if (props.selectedRequisite && cardNumber.value && selectedWallet.value && selectedPaymentMethod.value) {
    const data: IUpdateRequisiteParams = {
      id: props.selectedRequisite.id,
      data: {
        requisite: cardNumber.value,
        currency: selectedWallet.value?.name,
        payment_method: selectedPaymentMethod.value?.id
      }
    }
    store.dispatch('requisites/updateRequisite', data)
  }
  emit('close-modal')
}

onMounted(async () => {
  selectedWallet.value = selectedRequisiteCurrency.value ?? wallets.value[0]
  cardNumber.value = props.selectedRequisite?.requisite ?? ''
  await setPaymentMethods()
  selectedPaymentMethod.value = selectedRequisitePaymentMethod.value ?? paymentMethods.value[0];
});
</script>

<style scoped lang="scss">
@import "editRequisitesModal";
</style>