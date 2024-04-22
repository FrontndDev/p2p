<template>
  <div class="place-ad">
    <Ad
        :selected-inner-currency="selectedInnerCurrency"
        :selected-outer-currency="selectedOuterCurrency"
        :selected-price-type="selectedPriceType"
        :selected-payment-method="selectedPaymentMethod"
        :min-amount="String(data.min_amount)"
        :max-amount="String(data.max_amount)"
        :comment="data.comment"
        @select-inner-currency="(item: ISelect) => selectedInnerCurrency = item"
        @select-outer-currency="(item: ISelect) => selectedOuterCurrency = item"
        @select-price-type="(item: ISelect) => selectedPriceType = item"
        @input-selling-price="(value: string) => data.price = +value"
        @input-amount-of-currency=""
        @input-min-transfer="(value: string) => data.min_amount = +value"
        @input-max-transfer="(value: string) => data.max_amount = +value"
        @select-payment-method="(item: ISelect) => selectedPaymentMethod = item"
        @input-comment="(value: string) => data.comment = value"
    />
    <AdInformation @create-ad="createAd"/>
  </div>
</template>

<script setup lang="ts">
import Ad from "@/views/PlaceAd/Ad/Ad.vue";
import AdInformation from "@/views/PlaceAd/AdInformation/AdInformation.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
  Ref,
  ref,
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import {
  IAdParams,
} from "@/interfaces/store/modules/ads.interface.ts";

const store = useStore();

const selectedInnerCurrency: Ref<ISelect | null> = ref(null);
const selectedOuterCurrency: Ref<ISelect | null> = ref(null);
const selectedPriceType: Ref<ISelect | null> = ref(null);
const selectedPaymentMethod: Ref<ISelect | null> = ref(null);

const priceType = computed(() => {
  switch (selectedPriceType.value?.id) {
    case 1:
      return 'fixed'
  }
})

const data: ComputedRef<IAdParams> = computed(() => ({
  inner_currency: selectedInnerCurrency.value?.name ?? '',
  outer_currency: selectedOuterCurrency.value?.name ?? '',
  requisite_id: selectedPaymentMethod.value?.id ?? -1,
  min_amount: 10,
  max_amount: 20,
  comment: '',
  factor: -1, // if price_type == float
  price: 0, // if price_type == fixed
  price_type: priceType.value ?? '' // percent | float
}));

const createAd = () => {
  store.dispatch('ads/createAd', data.value)
}
</script>

<style scoped lang="scss">
@import "placeAd";
</style>