<template>
  <div class="my-header">
    <div class="my-header__up">
      <div class="my-header__title title-h1">Social P2P</div>
      <Tabs
          type="header-tabs"
          :default-tab="getTabByRouteName"
          :tabs="props.tabs"
          @set-tab="setTab"
      />
    </div>

    <div class="my-header__selects" v-if="route.name === HomeRoutesEnum.purchase">
      <Select
          v-for="select in selects"
          :key="select.id"
          :id="select.id"
          :title="select.title"
          :items="select.items"
          :selected-item="select.selectedItem.value"
          @select="selectItem"
      />
      <MyInput
          type="number"
          title="Количество"
          placeholder="Введите сумму"
          :value="sum"
          @input-value="inputValue"
          @blur="store.dispatch('ads/getAds')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import Select from "@/components/UI/Select/Select.vue";
import {
  computed,
  ComputedRef,
  onMounted,
  PropType,
} from "vue";
import MyInput from "@/components/UI/MyInput/MyInput.vue";
import {
  ISelect,
  ISelects
} from "@/components/UI/Select/select.interface.ts";

import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";
import { useRoute } from "vue-router";
import { HomeRoutesEnum } from "@/enums/home-routes.enum.ts";
import { useStore } from "vuex";
import { IPaymentMethod } from "@/interfaces/store/modules/payment-methods.interface.ts";

const props = defineProps({
  tabs: {
    type: Object as PropType<ITabs[]>,
    required: true,
  }
})

const emit = defineEmits(['set-tab'])

const route = useRoute();

const store = useStore();

const getTabByRouteName = computed(() => {
  const routeName = route.name as HomeRoutesEnum

  switch (routeName) {
    case HomeRoutesEnum.purchase:
      return props.tabs[0]
    case HomeRoutesEnum.sale:
      return props.tabs[1]
  }
})

const innerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.innerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const outerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const paymentMethods: ComputedRef<ISelect[]> = computed(() =>
    store.state.paymentMethods.paymentMethods.map((method: IPaymentMethod) => ({ id: method.id, name: method.name }))
);

const innerCurrency: ComputedRef<ISelect> = computed(() => store.state.currencies.innerCurrency);
const outerCurrency: ComputedRef<ISelect> = computed(() => store.state.currencies.outerCurrency);
const selectedPaymentMethod: ComputedRef<ISelect> = computed(() => store.state.paymentMethods.selectedPaymentMethod);
const sum: ComputedRef<string> = computed(() => store.state.ads.minAmount);

const selects: ComputedRef<ISelects[]> = computed(() => [
  {
    id: 1,
    title: 'Покупаю',
    items: innerCurrencies.value,
    selectedItem: computed(() => innerCurrency.value)
  },
  {
    id: 2,
    title: 'Отдаю',
    items: outerCurrencies.value,
    selectedItem: computed(() => outerCurrency.value)
  },
  {
    id: 3,
    title: 'Способ оплаты',
    items: paymentMethods.value,
    selectedItem: computed(() => selectedPaymentMethod.value)
  }
])

const selectItem = async (item: ISelect, id: number) => {
  store.commit('ads/SET_ADS', null)

  switch (id) {
    case 1:
      // Выбираем валюту которую покупаем
      store.commit('currencies/SET_INNER_CURRENCY', item);
      break;
    case 2:
      // Выбираем валюту которую отдаём
      store.commit('currencies/SET_OUTER_CURRENCY', item);
      // При смене внутренней валюты получаем доступные способы оплаты
      await store.dispatch('paymentMethods/getPaymentMethodsByCurrency', item.name).then(() => {
        store.commit('paymentMethods/SET_SELECTED_PAYMENT_METHOD', paymentMethods.value[0])
      })
      break;
    case 3:
      // Выбираем способ оплаты
      store.commit('paymentMethods/SET_SELECTED_PAYMENT_METHOD', item);
      break;
  }

  // Получаем объявления
  await store.dispatch('ads/getAds');
}

const inputValue = (value: string) => {
  store.commit('ads/SET_MIN_AMOUNT', value)
}

const setTab = (tab: ITabs) => {
  emit('set-tab', tab)
}

onMounted( () => {
  // Получаем списки валют
  store.dispatch('currencies/getCurrencies').then(() => {
    store.commit('currencies/SET_INNER_CURRENCY', innerCurrencies.value[0])
    store.commit('currencies/SET_OUTER_CURRENCY', outerCurrencies.value[0])

    // Получаем доступные способы оплаты выбранной валюты
    store.dispatch('paymentMethods/getPaymentMethodsByCurrency', outerCurrencies.value[0].name).then(() => {
      store.commit('paymentMethods/SET_SELECTED_PAYMENT_METHOD', paymentMethods.value[0])

      store.dispatch('ads/getAds')
    })
  })

  if (outerCurrencies.value?.length) {
    store.commit('currencies/SET_INNER_CURRENCY', innerCurrencies.value[0])
    store.commit('currencies/SET_OUTER_CURRENCY', outerCurrencies.value[0])

    store.dispatch('paymentMethods/getPaymentMethodsByCurrency', outerCurrencies.value[0].name).then(() => {
      store.commit('paymentMethods/SET_SELECTED_PAYMENT_METHOD', paymentMethods.value[0])

      store.dispatch('ads/getAds')
    })
  }
})
</script>

<style scoped lang="scss">
@import "myHeader";
</style>