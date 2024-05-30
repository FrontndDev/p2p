<template>
  <div class="ad-filling">
    <div class="ad-filling__header">
      <div class="ad-filling__header-left">
        <div class="title-h2 fw-700">Объявление</div>
        <Badge name="Продажа"/>
      </div>
      <AdditionalInfo
          :date="detailAdTime.date"
          :time="detailAdTime.time"
          :id="detailAd.id"
          v-if="route.name === 'edit-ad'"
      />
    </div>

    <div class="ad-filling__content">
      <div class="ad-filling__row">
        <div class="ad-filling__row-title">Тип</div>
        <div class="ad-filling__row-content">
          <div class="ad-filling__row-select">
            <Select
                title="Продаю"
                :items="innerCurrencies"
                :selected-item="props.selectedInnerCurrency"
                :is-currency="true"
                @select="selectInnerCurrency"
            />
            <span>Всего доступно <span>{{ amountOfCurrency }} {{ props.selectedInnerCurrency?.name }}</span></span>
          </div>
          <Select
              title="За валюту"
              :items="outerCurrencies"
              :selected-item="props.selectedOuterCurrency"
              :is-currency="true"
              @select="selectOuterCurrency"
          />
        </div>
      </div>
      <div class="ad-filling__row">
        <div class="ad-filling__row-title">Настройка цены</div>
        <div class="ad-filling__row-content">
          <Select
              title="Тип цены"
              :items="props.priceTypes"
              :selected-item="props.selectedPriceType"
              @select="selectPriceType"
          />

          <MyInput
              type="number"
              class="my-input-second"
              id="price"
              placeholder="1 000 000"
              title="Цена продажи"
              :error="isError('price')"
              :value="String(props.sellingPrice)"
              :currency="props.selectedOuterCurrency?.name"
              v-if="props.selectedPriceType?.id === 1"
              @input-value="inputSellingPrice"
          />

          <div class="ad-filling__row-inputs" v-if="props.selectedPriceType?.id === 2">
            <MyInput
                type="number"
                class="my-input-second"
                id="factor"
                placeholder="100"
                title="Множитель"
                :error="isError('factor')"
                :value="String(props.factor)"
                @input-value="inputFactor"
            />
            <StarIcon/>
            <MyInput
                type="number"
                class="my-input-second bg-blue"
                placeholder="1 000 000"
                title="Актуальный курс"
                :value="String(actualCurrentRate)"
                :disabled="true"
                :currency="props.selectedOuterCurrency?.name"
            />
          </div>
        </div>
      </div>
      <div class="ad-filling__row">
        <div class="ad-filling__row-title">Параметры сделки</div>
        <div class="ad-filling__row-content">
          <div class="ad-filling__row-input">
            <MyInput
                type="number"
                class="my-input-second"
                placeholder="Доступно 1 000 000"
                title="Количество на продажу"
                :disabled="true"
                :value="String(amountOfCurrency)"
                :currency="props.selectedInnerCurrency?.name"
            />

            <div class="ad-filling__row-input-info">
              <div>
                <span>Для продажи</span>
                <span>{{ amountOfCurrency }} {{ props.selectedInnerCurrency?.name }}</span>
              </div>
              <div>
                <span>Комиссия</span>
                <span>{{ parseFloat(transactionFee) }} {{ props.selectedInnerCurrency?.name }}</span>
              </div>
            </div>
          </div>

          <MyInput
              type="number"
              class="my-input-second"
              id="min_amount"
              title="Минимальный перевод"
              :placeholder="String(props.rateUSD)"
              :error="isError('min_amount')"
              :value="props.minAmount"
              :currency="props.selectedOuterCurrency?.name"
              @input-value="inputMinTransfer"
              @blur="emit('input-min-transfer-blur')"
          />
          <MyInput
              type="number" 
              class="my-input-second"
              id="max_amount"
              placeholder="1 000 000"
              title="Максимальный перевод"
              :error="isError('max_amount')"
              :value="props.maxAmount"
              :currency="props.selectedOuterCurrency?.name"
              @input-value="inputMaxTransfer"
              @blur="emit('input-max-transfer-blur')"
          />
        </div>
      </div>
      <div class="ad-filling__row">
        <div class="ad-filling__row-title">Способ оплаты</div>
        <div class="ad-filling__row-content" :class="{ 'column-reverse': route.name === 'edit-ad' }">
          <PaymentMethods class="flex-start" :payment-methods="paymentMethodsForDisplay" v-if="paymentMethods?.length"/>
          <MyButton
              class="ad-filling__row-button ad__row-button_first requisite_id"
              type="second-primary-btn"
              size="big"
              width="100%"
              :error="isError('requisite_id')"
              :name="route.name === 'edit-ad' ? 'Управление реквизитами' : 'Выберите способ оплаты'"
              @click="showSelectPaymentMethod = true"
          >
            <template #icon-left>
              <AddIcon/>
            </template>
          </MyButton>
        </div>
      </div>
      <div class="ad-filling__row">
        <div class="ad-filling__row-title">Таймер подтверждений</div>
        <div class="ad-filling__row-content">
          <Select
              title="Время в минутах"
              :items="times"
              :selected-item="props.selectedTime"
              @select="selectTime"
          />
        </div>
      </div>
      <div class="ad-filling__row">
        <div class="ad-filling__row-title">Комментарий</div>
        <div class="ad-filling__row-content">
          <textarea
              placeholder="Оставьте комментарий"
              :value="props.comment"
              @input="inputComment($event)"
          />
        </div>
      </div>
      <div class="ad-filling__row">
        <div class="ad-filling__row-title">Telegram Bot</div>
        <div class="ad-filling__row-content">
          <div class="ad-filling__row-mark">
            <div>
              <div class="ad-filling__row-mark-circle" :class="telegramActive ? 'active' : 'no-active'">
                <component :is="telegramActive ? CheckMarkIcon : ExclamationIcon"/>
              </div>

              {{ telegramActive ? 'Привязан' : 'Не привязан' }}
            </div>
            <div class="ad-filling__row-mark-btn" v-if="!telegramActive">Привязать</div>
          </div>
        </div>
      </div>
    </div>

    <SelectPaymentMethodModal
        :selected-payment-method="props.selectedPaymentMethod"
        :selected-outer-currency="props.selectedOuterCurrency"
        v-if="showSelectPaymentMethod"
        @select-payment-method="selectPaymentMethod"
        @close-modal="showSelectPaymentMethod = false"
    />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import AddIcon from '@/assets/svg/add.svg?component';
// @ts-ignore
import CheckMarkIcon from '@/assets/svg/deal/check-mark.svg?component';
// @ts-ignore
import ExclamationIcon from '@/assets/svg/deal/exclamation.svg?component';
// @ts-ignore
import StarIcon from '@/assets/svg/star.svg?component';
import Badge from "@/components/UI/Badge/Badge.vue";
import AdditionalInfo from "@/components/UI/AdditionalInfo/AdditionalInfo.vue";
import Select from "@/components/UI/Select/Select.vue";
import _ from 'lodash';
import {
  computed,
  ComputedRef,
  onMounted,
  PropType,
  ref,
  watch
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import MyInput from "@/components/UI/MyInput/MyInput.vue";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  IRequisite,
} from "@/interfaces/store/modules/profile.interface.ts";
import SelectPaymentMethodModal
  from "@/components/Modals/Contents/SelectPaymentMethodModal/SelectPaymentMethodModal.vue";

const props = defineProps({
  priceTypes: {
    type: Array as PropType<ISelect[]>,
    required: true,
  },
  selectedInnerCurrency: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  selectedOuterCurrency: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  selectedPriceType: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  selectedPaymentMethod: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  selectedTime: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  sellingPrice: {
    type: Number,
  },
  minAmount: {
    type: String,
  },
  maxAmount: {
    type: String,
  },
  comment: {
    type: String,
  },
  factor: {
    type: Number,
  },
  invalidFields: {
    type: Array as PropType<any[]>,
  },
  rateUSD: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits([
  'select-inner-currency',
  'select-outer-currency',
  'select-price-type',
  'input-factor',
  'input-selling-price',
  'input-amount-of-currency',
  'input-min-transfer',
  'input-max-transfer',
  'select-payment-method',
  'select-time',
  'input-comment',
  'input-min-transfer-blur',
  'input-max-transfer-blur',
]);

const route = useRoute();
const store = useStore();

const showSelectPaymentMethod = ref(false);

const currencies = computed(() => store.state.currencies)
const profile = computed(() => store.state.profile)

const amountOfCurrency = computed(() => profile.value.profile?.wallets?.[props.selectedInnerCurrency?.name ?? '']?.amount);
const transactionFee = computed(() => {
  const transactionFee = (num: number) => (amountOfCurrency.value * currencies.value.transactionFee).toFixed(num)

  switch (props.selectedInnerCurrency?.name) {
    case 'USD':
      return transactionFee(2)
    case 'TON':
      return transactionFee(4)
    default:
      return transactionFee(0)
  }
});

const innerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    currencies.value.innerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const outerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    currencies.value.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const paymentMethods: ComputedRef<ISelect[]> = computed(() =>
    store.state.profile.profile?.requisites
        ?.filter((method: IRequisite) => method?.currency === props.selectedOuterCurrency?.name)
        ?.map((method: IRequisite) => ({ id: method.id, name: method.paymentMethod }))
);

const paymentMethodsForDisplay = computed(() => {
  const filteredMethods = Array.from(new Set(paymentMethods.value.map(method => method.name)));
  return filteredMethods.map((name, idx) => ({ id: idx + 1, name }));
});
const times: ComputedRef<ISelect[]> = computed(() =>
    store.state.profile.profile?.allowedPaymentWindow?.map((num: number, idx: number) => ({ id: idx, name: num }))
);
const detailAd = computed(() => store.state.profile.detailAd);

const detailAdTime = computed(() => {
  const time = detailAd.value.createdAt?.split(' ')
  return {
    date: time?.[0]?.split('-').reverse().join('.'),
    time: time?.[1]?.slice(0, 5),
  }
})

const actualCurrentRate: ComputedRef<number> = computed(() => currencies.value.currentRate)
const telegramActive = computed(() => store.state.profile.profile.telegramActive)

const selectInnerCurrency = (item: ISelect) => {
  emit('select-inner-currency', item)
  getCurrentRate(item.name, props.selectedOuterCurrency?.name)
}

const selectOuterCurrency = async (item: ISelect) => {
  emit('select-outer-currency', item)
  getCurrentRate(props.selectedInnerCurrency?.name, item.name)
}

const isError = (key: string) => props.invalidFields.includes(key)

const selectPriceType = (item: ISelect) => {
  emit('select-price-type', item)
}

const inputFactor = (value: string) => {
  emit('input-factor', value)
}

const inputSellingPrice = (item: ISelect) => {
  emit('input-selling-price', item)
}

const inputMinTransfer = (item: ISelect) => {
  emit('input-min-transfer', item)
}

const inputMaxTransfer = (item: ISelect) => {
  emit('input-max-transfer', item)
}

const selectPaymentMethod = (item: ISelect) => {
  emit('select-payment-method', item)
}

const selectTime = (item: ISelect) => {
  emit('select-time', item)
}

const inputComment = (e: Event) => {
  emit('input-comment', (e.target as HTMLTextAreaElement).value)
}

const getCurrentRate = (from?: string, to?: string) => {
  if (from && to) {
    store.dispatch('currencies/getCurrencyRate', { from, to });
  }
}

watch(() => paymentMethods.value?.length, () => {
  if (route.name === 'place-ad') {
    selectPaymentMethod(paymentMethods.value[0]);
  }
});

watch(() => times.value?.length, () => {
  if (route.name === 'place-ad') {
    selectTime(times.value[0]);
  }
});

watch(() => props.invalidFields.join(''), () => {
  if (props.invalidFields.length) {
    const block = document.querySelector(`#${props.invalidFields[0]}`)
    if (block) setTimeout(() => block.scrollIntoView({ block: 'center', behavior: 'smooth' }), 0)
  }
});

onMounted(() => {
  selectPriceType(props.priceTypes[0])
  selectInnerCurrency(innerCurrencies.value[0])
  selectOuterCurrency(outerCurrencies.value[0])
  getCurrentRate(innerCurrencies.value[0].name, outerCurrencies.value[0].name)
  if (paymentMethods.value) selectPaymentMethod(paymentMethods.value[0])
  if (times.value) selectTime(times.value[0])

  if (route.name === 'edit-ad' && route.params.id) {
    store.dispatch('profile/getDetailAd', +route.params.id)
  }
})
</script>

<style scoped lang="scss">
@import "ad";
</style>