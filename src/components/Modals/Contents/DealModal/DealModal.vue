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
                    name="Константинопольский Константин"
                    :successful-num="145"
                    :done-num="100"
                />
              </div>

              <div class="deal-modal__info">
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Цена</div>
                  <div class="deal-modal__info-item-value deal-modal__info-item-value_price">1 000 000 RUB</div>
                </div>
                <div class="deal-modal__info-item deal-modal__info-item_payment-methods">
                  <div class="deal-modal__info-item-title">Способ оплаты</div>
                  <div class="deal-modal__info-item-value">
                    <PaymentMethods bg="base-light" :payment-methods="paymentMethods"/>
                  </div>
                </div>
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Доступно</div>
                  <div class="deal-modal__info-item-value">
                    1 000 000 USD
                    <USDIcon/>
                  </div>
                </div>
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Лимиты</div>
                  <div class="deal-modal__info-item-value">1 000 000Р - 999 999 999Р</div>
                </div>
                <div class="deal-modal__info-item">
                  <div class="deal-modal__info-item-title">Окно оплаты</div>
                  <div class="deal-modal__info-item-value">15 минут</div>
                </div>
              </div>

              <div class="deal-modal__comment">
                <div class="deal-modal__comment-title">Комментарий продавца</div>
                <div class="deal-modal__comment-content">
                  Всегда готова к сделке, я 24/7 на связи, пишите звоните, помогу в чате в тг, предложу любой обмен, рада сотрудничеству и постоянным клиентам
                  <br>
                  <br>
                  Всегда готова к сделке, я 24/7 на связи, пишите звоните, помогу в чате в тг, предложу любой обмен, рада сотрудничеству и постоянным клиентам
                </div>
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
              <MyButton size="big" name="Открыть сделку" width="50%"/>
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
  onMounted,
  reactive,
  Ref,
  ref
} from "vue";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import USDIcon from '@/assets/svg/wallets/usd.svg?component'
import Select from "@/components/UI/Select/Select.vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import MyInput from "@/components/UI/MyInput/MyInput.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";

const emit = defineEmits(['close-modal'])

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