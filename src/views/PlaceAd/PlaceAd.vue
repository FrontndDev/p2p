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
        :invalid-fields="invalidFields"
        :rateUSD="rateUSD"
        @select-inner-currency="selectInnerCurrency"
        @select-outer-currency="selectOuterCurrency"
        @select-price-type="selectPriceType"
        @input-selling-price="inputSellingPrice"
        @input-min-transfer="inputMinTransfer"
        @input-max-transfer="inputMaxTransfer"
        @select-payment-method="(item: ISelect) => selectedPaymentMethod = item"
        @select-time="(item: ISelect) => selectedTime = item"
        @input-comment="(value: string) => comment = value"
        @input-factor="inputFactor"
        @input-factor-blur="inputFactorBlur"
        @input-min-transfer-blur="inputMinTransferBlur"
        @input-max-transfer-blur="inputMaxTransferBlur"
        @input-selling-price-blur="inputSellingPriceBlur"
    />
    <AdInformation
        :save-btn-disabled="createInProcess"
        :show-save-btn="!_.isEqual(data, copyData)"
        :selected-inner-currency="selectedInnerCurrency"
        :selected-outer-currency="selectedOuterCurrency"
        :selling-price="price"
        :factor="factor ? factor : 100"
        :min-amount="minAmount"
        :max-amount="maxAmount"
        :selected-payment-method="selectedPaymentMethod"
        :agreement="agreement"
        :invalid-fields="invalidFields"
        :price-type="priceType"
        @create-ad="createAd"
        @set-agreement="agreement = !agreement"
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
  onMounted,
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
import { useShowMessage } from "@/composables/useShowMessage.ts";

const store = useStore();
const router = useRouter();
const route = useRoute();

const selectedInnerCurrency: Ref<ISelect | null> = ref(null);
const selectedOuterCurrency: Ref<ISelect | null> = ref(null);
const selectedPriceType: Ref<ISelect | null> = ref(null);
const selectedPaymentMethod: Ref<ISelect | null> = ref(null);
const selectedTime: Ref<ISelect | null> = ref(null);
const minAmount = ref();
const maxAmount = ref();
const comment = ref('');
const factor: Ref<number | undefined> = ref(110);
const price: Ref<number | undefined> = ref(undefined);

const agreement = ref(false);

const copyData = ref({});
const createInProcess = ref(false);

const invalidFields: Ref<string[]> = ref([]);

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
const currencies = computed(() => store.state.currencies);
const profile = computed(() => store.state.profile);

const priceType = computed(() => {
  switch (selectedPriceType.value?.id) {
    case 1:
      return 'fixed'
    case 2:
      return 'dynamic'
  }
});

const getPriceTypeId = (name: 'fixed' | 'dynamic') => {
  switch (name) {
    case 'fixed':
      return priceTypes[0]
    case 'dynamic':
      return priceTypes[1]
  }
}

const innerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    currencies.value.innerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const outerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    currencies.value.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const requisites = computed(() =>
    profile.value.profile?.requisites?.map((requisite: IRequisite) => ({ id: requisite.id, name: requisite.paymentMethod }))
);
const times: ComputedRef<ISelect[]> = computed(() =>
    profile.value.profile?.allowedPaymentWindow?.map((num: number, idx: number) => ({ id: idx, name: num }))
);

const amountOfCurrency = computed(() => +profile.value.profile?.wallets?.[selectedInnerCurrency.value?.name ?? '']?.amount);
const actualCurrentRate: ComputedRef<number> = computed(() => +currencies.value.currentRate);
const rateUSD = ref(0);

const data: ComputedRef<IAdParams> = computed(() => ({
  inner_currency: selectedInnerCurrency.value?.name ?? '',
  outer_currency: selectedOuterCurrency.value?.name ?? '',
  price_type: priceType.value ?? '', // percent | float
  price: priceType.value === 'fixed' ? price.value : undefined, // if price_type == fixed
  factor: priceType.value === 'dynamic' ? factor.value : undefined, // if price_type == float
  min_amount: minAmount.value,
  max_amount: maxAmount.value,
  requisite_id: selectedPaymentMethod.value?.id ?? null,
  comment: comment.value,
  payment_window: +selectedTime.value?.name,
}));

const floatPriceTypeMaxAmount = computed(() =>
    +((factor.value / 100) * actualCurrentRate.value * amountOfCurrency.value).toFixed(4)
)

const setRate = async (item: ISelect) => {
  const response = await store.dispatch('currencies/getCurrencyRate', { from: 'USD', to: selectedOuterCurrency.value?.name ?? item.name })
  rateUSD.value = +response.data.rate
}

const setMinValueByRate = async (item: ISelect) => {
  await setRate(item)
  if (minAmount.value < rateUSD.value) {
    minAmount.value = rateUSD.value
  }
}

const selectInnerCurrency = (item: ISelect) => {
  selectedInnerCurrency.value = item
  setMinValueByRate(item)
  if (priceType.value === 'dynamic') getCurrentRate()
}

const selectOuterCurrency = async (item: ISelect) => {
  selectedOuterCurrency.value = item
  await setRate(item)
  minAmount.value = rateUSD.value < price.value ? price.value : rateUSD.value
  if (priceType.value === 'dynamic') {
    maxAmount.value = floatPriceTypeMaxAmount.value
  }
}

const selectPriceType = async (item: ISelect) => {
  selectedPriceType.value = item
  switch (item.id) {
    case 1:
      maxAmount.value = undefined;
      if (selectedInnerCurrency.value?.name === 'USD' && minAmount.value < rateUSD.value) {
        minAmount.value = rateUSD.value
      }
      store.commit('CLEAR_INTERVAL');
      break;
    case 2:
      factor.value = 110;
      await getCurrentRate();
      const min = (rateUSD.value * (factor.value / 100)).toFixed(2)
      if (minAmount.value < min) minAmount.value = min
      maxAmount.value = floatPriceTypeMaxAmount.value
      break;
  }
}

const setInvalidFields = () => {
  let copyData = {
    agreement: agreement.value,
    ..._.cloneDeep(data.value),
  }
  delete copyData.comment

  switch (priceType.value) {
    case 'dynamic':
      delete copyData.price
      break;
    case 'fixed':
      delete copyData.factor
      break;
  }

  const fields = [];
  const valuesToCheck = [null, undefined, '', false];

  for (const key in copyData) {
    if (copyData.hasOwnProperty(key)) {
      const value = copyData[key];

      if (valuesToCheck.includes(value)) {
        fields.push(key);
      }
    }
  }

  if (fields.length) useShowMessage('red', 'Заполните все обязательные поля', 'Ошибка:')

  invalidFields.value = fields;
}

const addError = (field: string, text: string) => {
  if (field) invalidFields.value = [field]
  if (text) useShowMessage('red', text)
}

const removeError = (field: string) => {
  const index = invalidFields.value.findIndex(value => value === field)
  if (index !== -1) invalidFields.value.splice(index, 1)
}

const inputSellingPrice = (value: string) => {
  removeError('price')
  price.value = value ? +value.slice(0, 12) : undefined
}

const inputMinTransfer = (value: string) => {
  minAmount.value = value ? +value.slice(0, 12) : undefined
}

const inputMaxTransfer = (value: string) => {
  maxAmount.value = value ? +value.slice(0, 12) : undefined
}

const inputFactor = (value: string) => {
  if (value.length > 3) return
  factor.value = +value ? +value : undefined
}

const inputFactorBlur = () => {
  if (factor.value < 50) factor.value = 50
  factor.value < 50 || factor.value > 150 ?
      addError('factor', 'Значение множителя должно быть в диапозоне от 50 до 150') :
      removeError('factor')
}

const inputMinTransferBlur = () => {
  const getValue = (formula: number) => +(maxAmount.value ? maxAmount.value <= formula ? maxAmount.value : formula : undefined)?.toFixed(4)

  switch (priceType.value) {
    case 'fixed':
      if (price.value) {
        if (!minAmount.value || minAmount.value < rateUSD.value) {
          useShowMessage('red', 'Минимальный перевод не может быть меньше 1$')
          minAmount.value = rateUSD.value
        } else if (minAmount.value < price.value) {
          useShowMessage('red', 'Минимальный перевод не может быть меньше цены продажи')
          minAmount.value = price.value
        }

        const value = getValue(price.value * amountOfCurrency.value)
        if (minAmount.value > value) minAmount.value = value
      } else {
        addError('price', 'Пожалуйста, сперва выставьте цену продажи')
        minAmount.value = rateUSD.value
      }
      break;
    case 'dynamic':
      if (minAmount.value > floatPriceTypeMaxAmount.value) minAmount.value = floatPriceTypeMaxAmount.value;
      if (minAmount.value > maxAmount.value) addError('max_amount', 'Максимальный перевод не может быть меньше минимального')
      break;
  }
}

const inputMaxTransferBlur = () => {
  const getValue = (formula: number) => +(maxAmount.value ? maxAmount.value <= formula ? maxAmount.value : formula : undefined)?.toFixed(4)

  switch (priceType.value) {
    case 'fixed':
      if (price.value) {
        if (maxAmount.value < minAmount.value) {
          addError('max_amount', 'Максимальный перевод не может быть меньше минимального')
        } else {
          removeError('max_amount')
          const value = getValue(price.value * amountOfCurrency.value)
          if (value < minAmount.value) addError('max_amount', 'Максимальный перевод не может быть меньше минимального')
          maxAmount.value = value
        }
      } else {
        addError('price', 'Пожалуйста, сперва выставьте цену продажи')
        maxAmount.value = undefined
      }
      break;
    case 'dynamic':
      maxAmount.value = getValue(floatPriceTypeMaxAmount.value)
      break;
  }
}

const inputSellingPriceBlur = () => {
  if (maxAmount.value) inputMaxTransferBlur()
  if (price.value > minAmount.value) minAmount.value = price.value
}

const createAd = async () => {
  setInvalidFields()

  if (!Object.keys(invalidFields.value)?.length && agreement.value) {
    createInProcess.value = true
    let response;

    switch (route.name) {
      case 'place-ad':
        response = await store.dispatch('profile/createAd', data.value)
        if (response?.result === 'success') await router.push({ name: 'sale' })
        break
      case 'edit-ad':
        response = await store.dispatch('profile/updateAd', { id: route.params.id, data: data.value })
        if (response?.result === 'success') {
          store.commit('profile/SET_DETAIL_AD', response?.data?.ad)
          setDefaultValues()
        }
        break;
    }
  }
  createInProcess.value = false
}

const getCurrentRate = async (
    from = selectedInnerCurrency.value.name,
    to = selectedOuterCurrency.value.name,
) => {
  if (from && to) {
    await store.dispatch('currencies/getCurrencyRate', { from, to })
    store.commit('CLEAR_INTERVAL')
    store.commit('SET_INTERVAL', setInterval(() => {
      store.dispatch('currencies/getCurrencyRate', { from, to })
    }, 60000))
  }
}

const setDefaultValues = () => {
  selectedPriceType.value = getPriceTypeId(detailAd.value.priceType)
  price.value = +detailAd.value.price.amount
  minAmount.value = +detailAd.value.minAmount.amount
  maxAmount.value = +detailAd.value.maxAmount.amount
  comment.value = detailAd.value.authorComment
  const requisite: ISelect | undefined = requisites.value?.find((requisite: IRequisite) => requisite.id === detailAd.value?.requisite?.id)
  const innerCurrency = innerCurrencies.value?.find(currency => currency.name === detailAd.value.currencyForBuy)
  const outerCurrency = outerCurrencies.value?.find(currency => currency.name === detailAd.value.currencyForSell)
  const time = times.value?.find(time => +time.name === detailAd.value.paymentWindow);

  if (requisite) selectedPaymentMethod.value = requisite
  if (innerCurrency) selectedInnerCurrency.value = innerCurrency
  if (outerCurrency) selectedOuterCurrency.value = outerCurrency
  if (time) selectedTime.value = time
  factor.value = detailAd.value.pricePercent
  agreement.value = true
  copyData.value = data.value

  if (priceType.value === 'dynamic') getCurrentRate()
}

watch(() => requisites.value && detailAd.value?.id, () => {
  if (route.name === 'edit-ad') {
    setDefaultValues()
  }
})

onMounted(() => {
  store.commit('transactions/SET_TRANSACTION_INFO', {})
  if (detailAd.value?.id === +route.params.id && route.name === 'edit-ad') {
    setDefaultValues()
  }
})
</script>

<style scoped lang="scss">
@import "placeAd";
</style>