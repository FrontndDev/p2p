<template>
  <RouterView />
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  onBeforeMount,
  watch,
} from "vue";
import { useStore } from "vuex";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const paymentMethods: ComputedRef<ISelect[]> = computed(() => {
  const paymentMethods = store.getters["paymentMethods/paymentMethodsForSelect"]
  return [{ id: '', name: 'Все способы оплаты' }, ...paymentMethods]
});

const getPaymentMethodsByCurrency = () => {
  // Получаем доступные способы оплаты выбранной валюты
  store.dispatch('paymentMethods/getPaymentMethodsByCurrency', store.state.currencies.outerCurrency.name).then(() => {
    store.commit('paymentMethods/SET_SELECTED_PAYMENT_METHOD', paymentMethods.value[0])

    if (route.name === 'purchase') store.dispatch('ads/getAds')
  })
}

watch(() => route.fullPath, (_, prev) => {
  if (prev !== '/') {
    localStorage.setItem('prevPage', prev)
  }

  store.commit('transactions/CLEAR_INTERVAL')
})

onBeforeMount(() => {
  store.dispatch('currencies/getCurrencies').then(() => {
    getPaymentMethodsByCurrency()
  })

  store.dispatch('profile/getProfile')
})
</script>

<style scoped lang="scss">

</style>