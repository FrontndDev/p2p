<template>
  <FullScreenLoader v-if="showLoader"/>
  <RouterView/>
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
import FullScreenLoader from "@/components/UI/FullScreenLoader/FullScreenLoader.vue";

const store = useStore();
const route = useRoute();

const transactions = computed(() => store.state.transactions)

const paymentMethods: ComputedRef<ISelect[]> = computed(() => {
  const paymentMethods = store.getters["paymentMethods/paymentMethodsForSelect"]
  return [{ id: '', name: 'Все способы оплаты' }, ...paymentMethods]
});

const showLoader = computed(() => store.state.showLoader)

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

  if (transactions.value.interval) store.commit('transactions/CLEAR_INTERVAL')
  if (store.state.interval) store.commit('CLEAR_INTERVAL')
  setTimeout(() => window.scrollTo(0, 0))
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