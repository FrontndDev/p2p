<template>
  <div class="place-ad">
    <Ad
        :price-types="priceTypes"
        :selected-inner-currency="selectedInnerCurrency"
        :selected-outer-currency="selectedOuterCurrency"
        :selected-price-type="selectedPriceType"
        :selected-payment-method="selectedPaymentMethod"
        :selected-time="selectedTime"
        :selling-price="price"
        :factor="factor"
        :min-amount="String(minAmount)"
        :max-amount="String(maxAmount)"
        :comment="comment"
        @select-inner-currency="(item: ISelect) => selectedInnerCurrency = item"
        @select-outer-currency="(item: ISelect) => selectedOuterCurrency = item"
        @select-price-type="(item: ISelect) => selectedPriceType = item"
        @input-selling-price="(value: string) => price = +value"
        @input-min-transfer="(value: string) => minAmount = +value"
        @input-max-transfer="(value: string) => maxAmount = +value"
        @select-payment-method="(item: ISelect) => selectedPaymentMethod = item"
        @select-time="(item: ISelect) => selectedTime = item"
        @input-comment="(value: string) => comment = value"
        @input-factor="(value: string) => factor = +value"
    />
    <AdInformation
        :show-save-btn="!_.isEqual(data, copyData)"
        :selected-inner-currency="selectedInnerCurrency"
        :selected-outer-currency="selectedOuterCurrency"
        :selling-price="price"
        :min-amount="minAmount"
        :max-amount="maxAmount"
        :selected-payment-method="selectedPaymentMethod"
        @create-ad="createAd"
    />
  </div>
</template>

<script setup lang="ts">
import Ad from "@/views/PlaceAd/Ad/Ad.vue";
import AdInformation from "@/views/PlaceAd/AdInformation/AdInformation.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
  reactive,
  Ref,
  ref,
  watch,
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import {
  IAdParams,
} from "@/interfaces/store/modules/ads.interface.ts";
import {
  useRoute,
  useRouter
} from "vue-router";
import { IRequisite } from "@/interfaces/store/modules/profile.interface.ts";
import _ from 'lodash';

const store = useStore();
const router = useRouter();
const route = useRoute();

const selectedInnerCurrency: Ref<ISelect | null> = ref(null);
const selectedOuterCurrency: Ref<ISelect | null> = ref(null);
const selectedPriceType: Ref<ISelect | null> = ref(null);
const selectedPaymentMethod: Ref<ISelect | null> = ref(null);
const selectedTime: Ref<ISelect | null> = ref(null);
const minAmount = ref(10);
const maxAmount = ref(20);
const comment = ref('');
const factor: Ref<number | undefined> = ref(undefined);
const price: Ref<number | undefined> = ref(undefined);

const copyData = ref({});

const priceTypes = reactive([
  {
    id: 1,
    name: 'Фиксированная'
  },
  {
    id: 2,
    name: 'Динамическая'
  }
]);

const detailAd = computed(() => store.state.profile.detailAd);

const priceType = computed(() => {
  switch (selectedPriceType.value?.id) {
    case 1:
      return 'fixed'
    case 2:
      return 'float'
  }
});

const getPriceTypeId = (name: 'fixed' | 'float') => {
  switch (name) {
    case 'fixed':
      return priceTypes[0]
    case 'float':
      return priceTypes[1]
  }
}

const innerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.innerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const outerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const requisites = computed(() =>
    store.state.profile.profile?.requisites?.map((requisite: IRequisite) => ({ id: requisite.id, name: requisite.paymentMethod }))
);
const times: ComputedRef<ISelect[]> = computed(() =>
    store.state.profile.profile?.allowedPaymentWindow?.map((num: number, idx: number) => ({ id: idx, name: num }))
);

const data: ComputedRef<IAdParams> = computed(() => ({
  inner_currency: selectedInnerCurrency.value?.name ?? '',
  outer_currency: selectedOuterCurrency.value?.name ?? '',
  requisite_id: selectedPaymentMethod.value?.id ?? -1,
  min_amount: minAmount.value,
  max_amount: maxAmount.value,
  comment: comment.value,
  factor: priceType.value === 'float' ? factor.value : undefined, // if price_type == float
  price: priceType.value === 'fixed' ? price.value : undefined, // if price_type == fixed
  price_type: priceType.value ?? '', // percent | float
  payment_window: +selectedTime.value?.name,
}));

const createAd = async () => {
  route.name === 'edit-ad' ?
      await store.dispatch('profile/updateAd', { id: route.params.id, data: data.value }) :
      await store.dispatch('profile/createAd', data.value)
  await router.push({ name: 'sale' })
}

const setDefaultValues = () => {
  price.value = +detailAd.value.price.amount
  minAmount.value = +detailAd.value.minAmount.amount
  maxAmount.value = +detailAd.value.maxAmount.amount
  comment.value = detailAd.value.authorComment
  const requisite: ISelect | undefined = requisites.value?.find((requisite: IRequisite) => requisite.id === detailAd.value.requisite.id)
  const innerCurrency = innerCurrencies.value?.find(currency => currency.name === detailAd.value.currencyForBuy)
  const outerCurrency = outerCurrencies.value?.find(currency => currency.name === detailAd.value.currencyForSell)
  const time = times.value?.find(time => +time.name === detailAd.value.paymentWindow);
  console.log('time', time)

  if (requisite) selectedPaymentMethod.value = requisite
  if (innerCurrency) selectedInnerCurrency.value = innerCurrency
  if (outerCurrency) selectedOuterCurrency.value = outerCurrency
  if (time) selectedTime.value = time
  selectedPriceType.value = getPriceTypeId(detailAd.value.priceType)
  copyData.value = data.value
}

watch(() => requisites.value && detailAd.value?.id, () => {
  if (route.name === 'edit-ad') {
    setDefaultValues()
  }
})
</script>

<style scoped lang="scss">
@import "placeAd";
</style>