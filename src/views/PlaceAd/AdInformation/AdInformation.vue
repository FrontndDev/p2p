<template>
  <div class="ad-information">
    <div class="ad-information__title title-h2 fw-700">Размещаемое объявление</div>

    <div class="ad-information__body">
      <div class="ad-information__content">
        <div class="ad-information__content-header">
          <div class="ad-information__content-title">Продажа</div>
          <div class="ad-information__content-wallet">
            <img src="@/assets/images/ton.png" alt="icon">
            TON
          </div>
        </div>

        <div class="ad-information__rows">
          <div class="ad-information__row">
            <div>Цена</div>
            <div class="fw-700">1 000 000 RUB</div>
          </div>
          <div class="ad-information__row">
            <div>Общее колличество</div>
            <div>1 000 000 BTC</div>
          </div>
          <div class="ad-information__row">
            <div>Лимиты</div>
            <div>1 000 000Р - 999 999 999Р</div>
          </div>
          <div class="ad-information__row">
            <div>Способ оплаты</div>
            <PaymentMethods :payment-methods="paymentMethods"/>
          </div>
        </div>

        <div class="ad-information__footer">
          <div class="ad-information__conditions">
            <MyCheckbox :active="conditions" @set-value="conditions = !conditions">
              <div class="ad-information__checkbox-text">
                Я прочитал(-а) и соглашаюсь с <a href="#">Условиями</a> и <a href="#">Политикой конфидентиальности P2P</a>
              </div>
            </MyCheckbox>
          </div>
          <MyButton size="big" width="100%" name="Разместить объявление"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import {
  reactive,
  ref
} from "vue";
import MyCheckbox from "@/components/UI/MyCheckbox/MyCheckbox.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";

const paymentMethods = reactive([
  {
    id: 1,
    name: 'Сбербанк'
  },
  {
    id: 2,
    name: 'Альфа'
  },
  {
    id: 3,
    name: 'Втб'
  },
  {
    id: 4,
    name: 'Тинькофф'
  },
  {
    id: 5,
    name: 'Райфайзен'
  }
]);

const conditions = ref(false);
</script>

<style scoped lang="scss">
@import "adInformation";
</style>