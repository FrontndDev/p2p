<template>
  <div class="place-ad">
    <Ad
        :selected-inner-currency="selectedInnerCurrency"
        :selected-outer-currency="selectedOuterCurrency"
        :selected-price-type="selectedPriceType"
        :selected-payment-method="selectedPaymentMethod"
        :selling-price="price"
        :amount-of-currency="amountOfCurrency"
        :min-amount="String(minAmount)"
        :max-amount="String(maxAmount)"
        :comment="comment"
        @select-inner-currency="(item: ISelect) => selectedInnerCurrency = item"
        @select-outer-currency="(item: ISelect) => selectedOuterCurrency = item"
        @select-price-type="(item: ISelect) => selectedPriceType = item"
        @input-selling-price="(value: string) => price = +value"
        @input-amount-of-currency="(value: string) => amountOfCurrency = +value"
        @input-min-transfer="(value: string) => minAmount = +value"
        @input-max-transfer="(value: string) => maxAmount = +value"
        @select-payment-method="(item: ISelect) => selectedPaymentMethod = item"
        @input-comment="(value: string) => comment = value"
    />
    <AdInformation
        :selected-inner-currency="selectedInnerCurrency"
        :selected-outer-currency="selectedOuterCurrency"
        :selling-price="price"
        :amount-of-currency="amountOfCurrency"
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
const minAmount = ref(10);
const maxAmount = ref(20);
const comment = ref('');
const factor: Ref<number | undefined> = ref(undefined);
const price: Ref<number | undefined> = ref(undefined);
const amountOfCurrency: Ref<number | undefined> = ref(undefined)

const priceType = computed(() => {
  switch (selectedPriceType.value?.id) {
    case 1:
      return 'fixed'
    case 2:
      return 'float'
  }
})

const data: ComputedRef<IAdParams> = computed(() => ({
  inner_currency: selectedInnerCurrency.value?.name ?? '',
  outer_currency: selectedOuterCurrency.value?.name ?? '',
  requisite_id: selectedPaymentMethod.value?.id ?? -1,
  min_amount: minAmount.value,
  max_amount: maxAmount.value,
  comment: comment.value,
  factor: priceType.value === 'float' ? factor.value : undefined, // if price_type == float
  price: priceType.value === 'fixed' ? price.value : undefined, // if price_type == fixed
  price_type: priceType.value ?? '' // percent | float
}));

const createAd = () => {
  store.dispatch('ads/createAd', data.value)
}
</script>

<style scoped lang="scss">
@import "placeAd";
</style>