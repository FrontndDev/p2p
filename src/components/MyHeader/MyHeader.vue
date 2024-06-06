<template>
  <div class="my-header" :class="{ 'for-popup': !props.tabs }">
    <div class="my-header__up" v-if="props.tabs">
      <div class="my-header__title title-h1">Social P2P</div>
      <Tabs
          type="header-tabs"
          :default-tab="getTabByRouteName"
          :tabs="props.tabs"
          @set-tab="setTab"
      />
    </div>

    <div class="my-header__selects" :class="{ 'for-popup': !props.tabs }" v-if="route.name === HomeRoutesEnum.purchase">
      <Select
          :class="{ 'no-media': !props.tabs }"
          v-for="select in selects"
          :key="select.id"
          :id="select.id"
          :title="select.title"
          :placeholder="select.placeholder"
          :items="select.items"
          :selected-item="select.selectedItem.value"
          :is-currency="[1, 2].includes(select.id)"
          @select="selectItem"
      />
      <MyInput
          type="number"
          title="Количество"
          placeholder="Введите сумму"
          :class="{ 'no-media': !props.tabs }"
          :value="sum"
          @input-value="inputValue"
          @keyup.enter="keyUpOrBlur"
          @blur="keyUpOrBlur"
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
  ref,
  watch,
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

const props = defineProps({
  // Если табы есть, то действуют настройки для хедера на странице Purchase.vue
  // Если табы не передаются, настройки действуют для попапа PurchaseFilter.vue
  tabs: {
    type: Object as PropType<ITabs[]>,
  }
})

const emit = defineEmits([
  'set-tab',
  'set-inner-currency',
  'set-outer-currency',
  'set-payment-method',
  'input-value',
]);

const route = useRoute();
const store = useStore();

const timeout = ref(0);
const canSendRequest = ref(false);

const getTabByRouteName = computed(() => {
  if (props.tabs) {
    const routeName = route.name as HomeRoutesEnum

    switch (routeName) {
      case HomeRoutesEnum.purchase:
        return props.tabs[0]
      case HomeRoutesEnum.sale:
        return props.tabs[1]
    }
  }
})

const innerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.innerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const outerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const paymentMethods: ComputedRef<ISelect[]> = computed(() => {
  const paymentMethods = store.getters["paymentMethods/paymentMethodsForSelect"]
  return [{ id: '', name: 'Все способы оплаты' }, ...paymentMethods]
});

const innerCurrency: ComputedRef<ISelect> = computed(() => store.state.currencies.innerCurrency);
const outerCurrency: ComputedRef<ISelect> = computed(() => store.state.currencies.outerCurrency);
const selectedPaymentMethod: ComputedRef<ISelect> = computed(() => store.state.paymentMethods.selectedPaymentMethod);
const sum: ComputedRef<string> = computed(() => store.state.ads.minAmount);

const selects: ComputedRef<ISelects[]> = computed(() => [
  {
    id: 1,
    title: 'Покупаю',
    placeholder: 'Выберите валюту',
    items: innerCurrencies.value,
    selectedItem: computed(() => innerCurrency.value)
  },
  {
    id: 2,
    title: 'Отдаю',
    placeholder: 'Выберите валюту',
    items: outerCurrencies.value,
    selectedItem: computed(() => outerCurrency.value)
  },
  {
    id: 3,
    title: 'Способ оплаты',
    items: paymentMethods.value,
    selectedItem: computed(() => selectedPaymentMethod.value)
  }
]);

const setValue = (callback: Function) => {
  // Если это хедер, сразу выполняем переданный запрос/метод
  if (props.tabs && window.innerWidth > 608) {
    callback()
  }
}

const selectItem = async (item: ISelect, id: number) => {
  setValue(() => {
    store.commit('ads/SET_ADS', null)
  })

  store.commit('ads/SET_MIN_AMOUNT', '');

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
      });
      break;
    case 3:
      // Выбираем способ оплаты
      store.commit('paymentMethods/SET_SELECTED_PAYMENT_METHOD', item)
      break;
  }

  // Получаем объявления
  setValue(() => getAds());
}

const inputValue = (value: string) => {
  if (timeout.value) clearTimeout(timeout.value)
  store.commit('ads/SET_MIN_AMOUNT', value);
  timeout.value = setTimeout(() => {
    store.commit('ads/SET_ADS', null)
    getAds()
  }, 2000)
}

const keyUpOrBlur = () => {
  if (canSendRequest.value) {
    store.commit('ads/SET_ADS', null)
    clearTimeout(timeout.value)
    getAds()
    canSendRequest.value = false
  }
}

const getAds = async () => {
  await store.dispatch('ads/getAds')
}

const setTab = (tab: ITabs) => {
  emit('set-tab', tab)
}

watch(() => sum.value, (oldV, newV) => {
  console.log('values', oldV, newV)
  canSendRequest.value = oldV !== newV
})

onMounted(() => {
  store.commit('paymentMethods/SET_SELECTED_PAYMENT_METHOD', paymentMethods.value[0])
})
</script>

<style scoped lang="scss">
@import "myHeader";
</style>