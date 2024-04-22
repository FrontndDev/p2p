<template>
  <RouterView />
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  onMounted
} from "vue";
import { useStore } from "vuex";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import { IPaymentMethod } from "@/interfaces/store/modules/payment-methods.interface.ts";

const store = useStore();

const innerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.innerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const outerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const paymentMethods: ComputedRef<ISelect[]> = computed(() =>
    store.state.paymentMethods.paymentMethods.map((method: IPaymentMethod) => ({ id: method.id, name: method.name }))
);

const setCurrencies = () => {
  store.commit('currencies/SET_INNER_CURRENCY', innerCurrencies.value[0])
  store.commit('currencies/SET_OUTER_CURRENCY', outerCurrencies.value[0])
}

const getPaymentMethodsByCurrency = () => {
  // Получаем доступные способы оплаты выбранной валюты
  store.dispatch('paymentMethods/getPaymentMethodsByCurrency', outerCurrencies.value[0].name).then(() => {
    store.commit('paymentMethods/SET_SELECTED_PAYMENT_METHOD', paymentMethods.value[0])
  })
}

onMounted( () => {
  store.dispatch('currencies/getCurrencies').then(() => {
    setCurrencies()
    getPaymentMethodsByCurrency()
  })
})
</script>

<style scoped lang="scss">

</style>