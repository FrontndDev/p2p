<template>
  <RouterView />
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  onBeforeMount,
} from "vue";
import { useStore } from "vuex";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import { IPaymentMethod } from "@/interfaces/store/modules/payment-methods.interface.ts";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const paymentMethods: ComputedRef<ISelect[]> = computed(() =>
    store.state.paymentMethods.paymentMethods.map((method: IPaymentMethod) => ({ id: method.id, name: method.name }))
);

const getPaymentMethodsByCurrency = () => {
  // Получаем доступные способы оплаты выбранной валюты
  store.dispatch('paymentMethods/getPaymentMethodsByCurrency', store.state.currencies.outerCurrency.name).then(() => {
    store.commit('paymentMethods/SET_SELECTED_PAYMENT_METHOD', paymentMethods.value[0])

    if (route.name === 'purchase') store.dispatch('ads/getAds')
  })
}

onBeforeMount(() => {
  store.dispatch('currencies/getCurrencies').then(() => {
    getPaymentMethodsByCurrency()
  })

  store.dispatch('profile/getProfile')
})
</script>

<style scoped lang="scss">

</style>