<template>
  <BottomPopup title="Фильтр" @close-popup="closePopup">
    <template #content>
      <div class="purchase-filter">
        <MyHeader
            @set-outer-currency="setOuterCurrency"
            @set-inner-currency="setInnerCurrency"
            @set-payment-method="setPaymentMethod"
            @input-value="inputValue"
        />

        <MyButton width="100%" size="big" name="Сохранить" @click="save"/>
      </div>
    </template>
  </BottomPopup>
</template>

<script setup lang="ts">
import BottomPopup from "@/components/BottomPopups/BottomPopup.vue";
import {
  onMounted,
  ref,
  Ref
} from "vue";
import {
  ISelect,
} from "@/components/UI/Select/select.interface.ts";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import MyHeader from "@/components/MyHeader/MyHeader.vue";
import { useStore } from "vuex";

const emit = defineEmits(['close-popup']);

const store = useStore();

const selectedInnerCurrency: Ref<ISelect | null> = ref(null);
const selectedOuterCurrency: Ref<ISelect | null> = ref(null);
const selectedPaymentMethod: Ref<ISelect | null> = ref(null);
const minAmount = ref('10');

const setOuterCurrency = (item: ISelect) => {
  selectedOuterCurrency.value = item
}

const setInnerCurrency = (item: ISelect) => {
  selectedInnerCurrency.value = item
}

const setPaymentMethod = (item: ISelect) => {
  selectedPaymentMethod.value = item
}

const inputValue = (value: string) => {
  minAmount.value = value
}

const closePopup = () => {
  store.commit('currencies/SET_INNER_CURRENCY', selectedInnerCurrency.value)
  store.commit('currencies/SET_OUTER_CURRENCY', selectedOuterCurrency.value)
  store.commit('paymentMethods/SET_PAYMENT_METHOD', selectedPaymentMethod.value)
  store.commit('ads/SET_MIN_AMOUNT', minAmount.value)
  emit('close-popup')
}

const save = async () => {
  store.commit('ads/SET_ADS', null)
  await store.dispatch('ads/getAds')
  emit('close-popup');
}

onMounted(() => {
  const innerCurrency = store.state.currencies.innerCurrency
  const outerCurrency = store.state.currencies.outerCurrency
  const paymentMethod = store.state.paymentMethods.selectedPaymentMethod
  const amount = store.state.ads.minAmount

  if (innerCurrency?.id !== undefined) selectedInnerCurrency.value = innerCurrency
  if (outerCurrency?.id !== undefined) selectedOuterCurrency.value = outerCurrency
  if (paymentMethod?.id !== undefined) selectedPaymentMethod.value = paymentMethod
  if (amount) minAmount.value = amount
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixins";

.purchase-filter {
  @include flexbox(column);
  row-gap: 24px;
  width: 100%;
}
</style>