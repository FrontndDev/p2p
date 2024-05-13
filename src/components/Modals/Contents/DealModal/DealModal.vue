<template>
  <Modal title="Покупка" padding="0" width="880px" :show-title="false" @close-modal="emit('close-modal')">
    <template #content>
      <div class="deal-modal">
        <div class="deal-modal__content">
          <div class="deal-modal__left">
            <div class="deal-modal__left-content">
              <div class="deal-modal__seller">
                <Seller
                    type="seller-modal"
                    :name="`${selectedDeal.adsAuthor?.first_name} ${selectedDeal.adsAuthor?.last_name}`"
                    :avatar="selectedDeal.adsAuthor?.avatar"
                />
              </div>

              <div class="deal-modal__info">
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Цена</div>
                  <div class="deal-modal__info-item-value deal-modal__info-item-value_price">
                    {{ selectedDeal.price.amount }} {{ selectedDeal.price.currency }}
                  </div>
                </div>
                <div class="deal-modal__info-item deal-modal__info-item_payment-methods">
                  <div class="deal-modal__info-item-title">Способ оплаты</div>
                  <div class="deal-modal__info-item-value">
                    <PaymentMethods bg="base-light" :payment-methods="[selectedPaymentMethod]" v-if="selectedPaymentMethod"/>
                  </div>
                </div>
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Доступно</div>
                  <div class="deal-modal__info-item-value bg-currency small-icon" :class="`currency-${selectedDeal.innerCurrency}`">
                    {{ selectedDeal.activeAmount }} {{ selectedDeal.innerCurrency }}
                  </div>
                </div>
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Лимиты</div>
                  <div class="deal-modal__info-item-value">
                    {{ selectedDeal.minAmount.amount }} {{ selectedDeal.minAmount.currency }}
                    -
                    {{ selectedDeal.maxAmount.amount }} {{ selectedDeal.maxAmount.currency }}
                  </div>
                </div>
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Окно оплаты</div>
                  <div class="deal-modal__info-item-value">15 минут</div>
                </div>
              </div>

              <div class="deal-modal__comment">
                <div class="deal-modal__comment-title">Комментарий продавца</div>
                <div class="deal-modal__comment-content">{{ selectedDeal.authorComment }}</div>
              </div>
            </div>
          </div>
          <div class="deal-modal__right">
            <div class="deal-modal__inputs">
              <MyInput
                  type="number"
                  class="no-media"
                  title="Я отдаю"
                  wallet="RUB"
                  :value="imGiving"
                  @input-value="setImGiving"
                  @all="setImGiving(getAmountInNumber(selectedDeal.maxAmount.amount))"
              />
              <MyInput
                  type="number"
                  class="no-media"
                  title="Я получу"
                  wallet="USD"
                  :value="iWillGet"
                  @input-value="setIWillGet"
                  @all="setIWillGet(String(selectedDeal.activeAmount))"
              />
              <Select
                  class="no-media"
                  title="Способ оплаты"
                  :items="paymentMethods"
                  :selected-item="selectedPaymentMethod"
                  @select="selectPaymentMethod"
              />
              <Select
                  title="Время в минутах"
                  :items="times"
                  :selected-item="selectedTime"
                  @select="selectTime"
              />
            </div>

            <div class="deal-modal__buttons">
              <MyButton type="neutral-btn" size="big" name="Отмена" width="50%" @click="emit('close-modal')"/>
              <MyButton
                  size="big"
                  name="Открыть сделку"
                  width="50%"
                  @click="openDeal"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modals/Modal.vue";
import Seller from "@/components/Seller/Seller.vue";
import {
  computed,
  ComputedRef,
  onMounted,
  reactive,
  Ref,
  ref,
} from "vue";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
// @ts-ignore
import USDIcon from '@/assets/svg/wallets/usd.svg?component'
import Select from "@/components/UI/Select/Select.vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import MyInput from "@/components/UI/MyInput/MyInput.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import { useStore } from "vuex";
import { IAd } from "@/interfaces/store/modules/ads.interface.ts";
import { ICreateDealParams } from "@/interfaces/store/modules/transactions.interface.ts";
import { useRouter } from "vue-router";

const props = defineProps({
  dealId: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits(['close-modal']);

const store = useStore();

const router = useRouter();

const paymentMethods = reactive([
  {
    id: 1,
    name: 'Сбербанк',
  },
  {
    id: 2,
    name: 'Альфа',
  },
  {
    id: 3,
    name: 'ВТБ',
  },
  {
    id: 4,
    name: 'Тинькофф',
  },
  {
    id: 5,
    name: 'Райфайзен',
  },
]);

const selectedPaymentMethod: Ref<ISelect | null> = ref(null);
const selectedTime: Ref<ISelect | null> = ref(null);

const selectedDeal: ComputedRef<IAd> = computed(() => store.state.ads.ads.ads.find((ad: IAd) => ad.id === props.dealId));

const times: ComputedRef<ISelect[]> = computed(() =>
    store.state.profile.profile?.allowedPaymentWindow?.map((num: number, idx: number) => ({ id: idx, name: String(num) }))
);

const getAmountInNumber = (str: string) => {
  return str.replace(/\s|₽/g, '')
}

const imGiving = ref('');
const iWillGet = ref('');

const selectPaymentMethod = (paymentMethod: ISelect) => {
  selectedPaymentMethod.value = paymentMethod
}

const setImGiving = (value: string) => {
  console.log('value', value)
  imGiving.value = value
  iWillGet.value = String((+imGiving.value / +selectedDeal.value.price.amount).toFixed(4))
}

const setIWillGet = (value: string) => {
  iWillGet.value = value
  imGiving.value = String((+iWillGet.value * +selectedDeal.value.price.amount).toFixed(4))
}

const selectTime = (time: ISelect) => {
  selectedTime.value = time
}

const openDeal = async () => {
  const data: ICreateDealParams = {
    adsId: selectedDeal.value.id,
    amount: +imGiving.value,
    comment: selectedDeal.value.authorComment,
    payment_window: +selectedTime.value.name
  }
  const response = await store.dispatch('transactions/createDeal', data)
  if (response?.data?.transaction?.id) {
    emit('close-modal')
    await router.push({ name: 'deal', params: { transactionId: response.data.transaction.id } })
  }
}

onMounted(() => {
  selectedPaymentMethod.value = paymentMethods[0]
  selectTime(times.value[0]);
})
</script>

<style scoped lang="scss">
@import "dealModal";
</style>