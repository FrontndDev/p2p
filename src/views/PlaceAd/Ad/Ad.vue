<template>
  <div class="ad">
    <div class="ad__header">
      <div class="ad__header-left">
        <div class="title-h2 fw-700">Объявление</div>
        <Badge name="Продажа"/>
      </div>
      <AdditionalInfo date="28.02.2024" time="18:01" id="12357413255"/>
    </div>

    <div class="ad__content">
      <div class="ad__row">
        <div class="ad__row-title">Тип</div>
        <div class="ad__row-content">
          <div class="ad__row-select">
            <Select
                title="Продаю"
                :items="innerCurrencies"
                :selected-item="props.selectedInnerCurrency"
                @select="selectInnerCurrency"
            />
            <span>Всего доступно <span>1 000 000 TON</span></span>
          </div>
          <Select
              title="За валюту"
              :items="outerCurrencies"
              :selected-item="props.selectedOuterCurrency"
              @select="selectOuterCurrency"
          />
        </div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Настройка цены</div>
        <div class="ad__row-content">
          <Select
              title="Тип цены"
              :items="priceTypes"
              :selected-item="props.selectedPriceType"
              @select="selectPriceType"
          />

          <MyInput
              type="number"
              class="my-input-second"
              placeholder="1 000 000"
              title="Цена продажи"
              :icon="TONIcon"
              :value="String(props.sellingPrice)"
              v-if="props.selectedPriceType?.id === 1"
              @input-value="inputSellingPrice"
          />

          <div class="ad__row-inputs" v-if="props.selectedPriceType?.id === 2">
            <MyInput
                type="number"
                class="my-input-second"
                placeholder="100"
                title="Множитель"
                :value="''"
                @input-value="inputFactor"
            />
            <StarIcon/>
            <MyInput
                type="number"
                class="my-input-second bg-blue"
                placeholder="1 000 000"
                title="Актуальный курс"
                :icon="TONIcon"
                :value="String(props.sellingPrice)"
                @input-value="inputSellingPrice"
            />
          </div>
        </div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Параметры сделки</div>
        <div class="ad__row-content">
          <div class="ad__row-input">
            <MyInput
                type="number"
                class="my-input-second"
                placeholder="Доступно 1 000 000"
                title="Количество на продажу"
                wallet="TON"
                :icon="TONIcon"
                @input-value="inputAmountOfCurrency"
            />

            <div class="ad__row-input-info">
              <div>
                <span>Для продажи</span>
                <span>1 000 TON</span>
              </div>
              <div>
                <span>Комиссия</span>
                <span>100 TON</span>
                <InfoIcon/>
              </div>
            </div>
          </div>

          <MyInput
              type="number"
              class="my-input-second"
              placeholder="10"
              title="Минимальный перевод"
              :icon="TONIcon"
              :value="props.minAmount"
              @input-value="inputMinTransfer"
          />
          <MyInput
              type="number"
              class="my-input-second"
              placeholder="1 000 000"
              title="Максимальный перевод"
              :icon="TONIcon"
              :value="props.maxAmount"
              @input-value="inputMaxTransfer"
          />
        </div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Способ оплаты</div>
        <div class="ad__row-content">
          <MyButton
              class="ad__row-button ad__row-button_first"
              type="second-primary-btn"
              size="big"
              width="100%"
              name="Управление реквизитами"
              v-if="route.name === 'edit-ad'"
          >
            <template #icon-left>
              <AddIcon/>
            </template>
          </MyButton>
          <PaymentMethods class="flex-start" :payment-methods="paymentMethods"/>
          <Select
              title="Выберите способ оплаты"
              :items="paymentMethods"
              :selected-item="selectedPaymentMethod"
              v-if="route.name === 'place-ad'"
              @select="selectPaymentMethod"
          />
        </div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Комментарий</div>
        <div class="ad__row-content">
          <textarea
              placeholder="Оставьте комментарий"
              :value="props.comment"
              @input="inputComment($event)"
          />
        </div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Telegram Bot</div>
        <div class="ad__row-content">
          <div class="ad__row-mark">
            <div>
              <div class="ad__row-mark-circle" :class="telegramConnected ? 'active' : 'no-active'">
                <component :is="telegramConnected ? CheckMarkIcon : ExclamationIcon"/>
              </div>

              {{ telegramConnected ? 'Привязан' : 'Не привязан' }}
            </div>
            <div class="ad__row-mark-btn" v-if="!telegramConnected">Привязать</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TONIcon from '@/assets/svg/wallets/ton.svg';
// @ts-ignore
import InfoIcon from '@/assets/svg/info.svg?component';
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
import {
  computed,
  ComputedRef,
  onMounted,
  PropType,
  reactive,
  Ref,
  ref,
  watch
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import MyInput from "@/components/UI/MyInput/MyInput.vue";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { IPaymentMethod } from "@/interfaces/store/modules/payment-methods.interface.ts";

const props = defineProps({
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
  sellingPrice: {
    type: Number,
    default: ''
  },
  minAmount: {
    type: String,
    default: '',
  },
  maxAmount: {
    type: String,
    default: '',
  },
  comment: {
    type: String,
    default: '',
  },
})

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
  'input-comment',
]);

const route = useRoute();
const store = useStore();

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

const telegramConnected = ref(false);

const innerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.innerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const outerCurrencies: ComputedRef<ISelect[]> = computed(() =>
    store.state.currencies.outerCurrencies.map((currency: string, idx: number) => ({ id: idx + 1, name: currency }))
);
const paymentMethods: Ref<ISelect[]> = ref([]);

const selectInnerCurrency = (item: ISelect) => {
  emit('select-inner-currency', item)
}

const selectOuterCurrency = async (item: ISelect) => {
  emit('select-outer-currency', item)
  const response = await store.dispatch('paymentMethods/getPaymentMethodsByCurrency', item.name)
  paymentMethods.value = response.data.payment_methods.map((method: IPaymentMethod) => ({ id: method.id, name: method.name }))
}

const selectPriceType = (item: ISelect) => {
  emit('select-price-type', item)
}

const inputFactor = (value: string) => {
  emit('input-factor', value)
}

const inputSellingPrice = (item: ISelect) => {
  emit('input-selling-price', item)
}

const inputAmountOfCurrency = (value: string) => {
  emit('input-amount-of-currency', value)
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

const inputComment = (e: Event) => {
  emit('input-comment', (e.target as HTMLTextAreaElement).value)
}

watch(() => paymentMethods.value.length, () => {
  selectPaymentMethod(paymentMethods.value[0])
});

onMounted(() => {
  selectPriceType(priceTypes[0])
  selectInnerCurrency(innerCurrencies.value[0])
  selectOuterCurrency(outerCurrencies.value[0])
})
</script>

<style scoped lang="scss">
@import "ad";
</style>