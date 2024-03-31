<template>
  <Modal padding="0" width="880px" @close-modal="emit('close-modal')">
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
              <MyInput title="Я отдаю" wallet="RUB"/>
              <MyInput title="Я получу" wallet="USD"/>
              <Select
                  title="Способ оплаты"
                  :items="paymentMethods"
                  :selected-item="selectedPaymentMethod"
                  @select="selectPaymentMethod"
              />
            </div>

            <div class="deal-modal__buttons">
              <MyButton type="neutral-btn" size="big" name="Отмена" width="50%" @click="emit('close-modal')"/>
              <MyButton size="big" name="Открыть ссылку" width="50%"/>
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
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.deal-modal {
  width: 100%;

  &__content {
    @include flexbox(row);
  }

  &__left {
    padding-bottom: 32px;
    width: 50%;
    border-radius: 16px 0 0 16px;
    background: $bg-base-secondary;
    position: relative;

    &::before {
      content: '';
      width: 360px;
      height: 24px;
      background: linear-gradient(180deg, rgba(245, 247, 248, 0) 0%, #F5F7F8 100%);
      position: absolute;
      bottom: 32px;
      left: 32px;
      right: 0;
      z-index: 1;
    }

    &-content {
      @include flexbox(column);
      row-gap: 24px;
      padding: 32px 32px 0;
      max-height: 560px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        width: 100%;
        background: $bg-base-bright;
      }
    }
  }

  &__right {
    @include flexbox(column, space-between);
    row-gap: 16px;
    padding: 32px;
    width: 50%;
    height: 592px;
    border-radius: 0 16px 16px 0;
    background: $bg-base;
  }

  &__inputs {
    @include flexbox(column);
    row-gap: 16px;
    width: 100%;
  }

  &__seller {
    padding-bottom: 24px;
    width: 100%;
    border-bottom: 1px solid $border-base-bright;
  }

  &__info {
    @include flexbox(column);
    row-gap: 16px;
    padding-bottom: 24px;
    width: 100%;
    border-bottom: 1px solid $border-base-bright;

    &-item {
      @include flexbox(row, space-between, center);
      column-gap: 8px;
      width: 100%;
      @include get-font(14px, 500, 20px, $text-base-light);

      &:not(:nth-child(1), :nth-child(2)) {
        padding: 4px 0;
      }

      &_payment-methods {
        align-items: flex-start;
      }

      &-title {
        flex-shrink: 0;
        width: 120px;
      }

      &-value {
        @include flexbox(row, flex-end, center);
        column-gap: 8px;
        width: 248px;
        color: $text-base;
        text-align: end;

        &_price {
          font-weight: 700;
        }
      }
    }
  }

  &__comment {
    @include flexbox(column);
    row-gap: 8px;
    @include get-font(14px, 500, 20px, $text-base-secondary);

    &-content {
      color: $text-base;
    }
  }

  &__buttons {
    @include flex-center;
    column-gap: 16px;
    width: 100%;
  }
}
</style>