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
                    :successful-num="-1"
                    :done-num="-1"
                    :name="`${selectedDeal.adsAuthor?.first_name} ${selectedDeal.adsAuthor?.last_name}`"
                    :avatar="selectedDeal.adsAuthor?.avatar"
                />
              </div>

              <div class="deal-modal__info">
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Цена</div>
                  <div class="deal-modal__info-item-value deal-modal__info-item-value_price">{{ selectedDeal.price }} {{ selectedDeal.outerCurrency }}</div>
                </div>
                <div class="deal-modal__info-item deal-modal__info-item_payment-methods">
                  <div class="deal-modal__info-item-title">Способ оплаты</div>
                  <div class="deal-modal__info-item-value">
                    <PaymentMethods bg="base-light" :payment-methods="[selectedPaymentMethod]" v-if="selectedPaymentMethod"/>
                  </div>
                </div>
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Доступно</div>
                  <div class="deal-modal__info-item-value">
                    {{ selectedDeal.activeAmount }} {{ selectedDeal.innerCurrency }}
                    <USDIcon/>
                  </div>
                </div>
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Лимиты</div>
                  <div class="deal-modal__info-item-value">{{ selectedDeal.minAmount }} - {{ selectedDeal.maxAmount }}</div>
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
              <MyInput class="no-media" title="Я отдаю" wallet="RUB"/>
              <MyInput class="no-media" title="Я получу" wallet="USD"/>
              <Select
                  class="no-media"
                  title="Способ оплаты"
                  :items="paymentMethods"
                  :selected-item="selectedPaymentMethod"
                  @select="selectPaymentMethod"
              />
            </div>

            <div class="deal-modal__buttons">
              <MyButton type="neutral-btn" size="big" name="Отмена" width="50%" @click="emit('close-modal')"/>
              <MyButton size="big" name="Открыть сделку" width="50%" @click="$router.push({ name: 'buy-currency' })"/>
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
  ref
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

const props = defineProps({
  dealId: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits(['close-modal']);

const store = useStore();

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

const selectedDeal: ComputedRef<IAd> = computed(() => store.state.ads.ads.ads.find((ad: IAd) => ad.id === props.dealId))

const selectPaymentMethod = (paymentMethod: ISelect) => {
  selectedPaymentMethod.value = paymentMethod
}

onMounted(() => {
  selectedPaymentMethod.value = paymentMethods[0]
})
</script>

<style scoped lang="scss">
@import "dealModal";
</style>