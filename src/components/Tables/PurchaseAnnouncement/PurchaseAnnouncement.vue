<template>
  <div class="my-table purchase-announcement">
    <div class="purchase-announcement__row my-table__row my-table__row_headers">
      <div>Продавец</div>
      <div>Валюта</div>
      <div>Цена</div>
      <div>Способ оплаты</div>
      <div>Доступно / Лимиты</div>
    </div>

    <div class="purchase-announcement__row my-table__row" v-for="row in table" :key="row.id">
      <div class="purchase-announcement__seller">
        <Seller :name="getName(row.name)"/>
      </div>
      <div class="purchase-announcement__wallet">
        <img alt="icon" :src="getIcon(row.wallet)">
        {{ row.wallet }}
      </div>
      <div class="purchase-announcement__price">{{ row.price }} RUB</div>
      <div class="purchase-announcement__payment-methods">
        <PaymentMethods
            class="flex-start"
            :payment-methods="getPaymentMethods(row.paymentMethods)"
        />
      </div>
      <div class="purchase-announcement__info">
        <div class="purchase-announcement__info-available">
          <span>Сумма</span>
          {{ row.available }}
          <img alt="icon" :src="getIcon(row.wallet)">
        </div>
        <div class="purchase-announcement__info-limits">
          <span>Лимит</span>
          {{ row.limits.min }} - {{ row.limits.max }} RUB
        </div>
      </div>
      <div class="purchase-announcement__button">
        <MyButton type="success-btn" :name="`Купить ${row.wallet}`" @click="emit('buy')"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import USDIcon from '@/assets/svg/wallets/usd.svg';
import TONIcon from '@/assets/svg/wallets/ton.svg';
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import {
  reactive
} from "vue";
import { useDeepCopy } from "@/composables/useDeepCopy.ts";
import Seller from "@/components/Seller/Seller.vue";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";

const emit = defineEmits(['buy'])

const table = reactive([
  {
    id: 1,
    name: 'Константин Константинопольский',
    successful: 0,
    done: 0,
    wallet: 'USD',
    price: 359320,
    paymentMethods: [
      {
        id: 1,
        name: 'Тинькофф'
      },
      {
        id: 2,
        name: 'Сбербанк'
      },
      {
        id: 3,
        name: 'Альфа'
      },
      {
        id: 4,
        name: 'Беларусь'
      },
      {
        id: 5,
        name: 'Райфайзен'
      },
      {
        id: 6,
        name: 'Банк'
      }
    ],
    available: 250000,
    limits: {
      min: 400250,
      max: 1000000,
    },
  },
  {
    id: 2,
    name: 'Егор Егоров',
    successful: 20,
    done: null,
    wallet: 'TON',
    price: 1000000,
    paymentMethods: [
      {
        id: 1,
        name: 'Тинькофф'
      },
      {
        id: 2,
        name: 'Сбербанк'
      },
      {
        id: 3,
        name: 'Альфа'
      },
      {
        id: 4,
        name: 'Беларусь'
      },
      {
        id: 5,
        name: 'Райфайзен'
      }
    ],
    available: 85000,
    limits: {
      min: 200,
      max: 1000,
    },
  },
  {
    id: 4,
    name: 'Евгений Евгегегегенененевич',
    successful: 5,
    done: 100,
    wallet: 'TON',
    price: 1000,
    paymentMethods: [
      {
        id: 1,
        name: 'Тинькофф'
      },
      {
        id: 2,
        name: 'Сбербанк'
      },
      {
        id: 3,
        name: 'Альфа'
      },
    ],
    available: 500,
    limits: {
      min: 100,
      max: 999,
    },
  },
  {
    id: 3,
    name: 'Иван Васкович',
    successful: 145,
    done: 95,
    wallet: 'USD',
    price: 50000,
    paymentMethods: [
      {
        id: 1,
        name: 'Тинькофф'
      },
      {
        id: 2,
        name: 'Сбербанк'
      },
      {
        id: 3,
        name: 'Альфа'
      },
      {
        id: 4,
        name: 'Беларусь'
      },
      {
        id: 5,
        name: 'Райфайзен'
      }
    ],
    available: 30000,
    limits: {
      min: 300000,
      max: 999999,
    },
  },
])


const getIcon = (type: string) => {
  switch (type) {
    case 'USD':
      return USDIcon
    case 'TON':
      return TONIcon
  }
}

const getName = (name: string) => {
  const array = name.split(' ')
  return `<span>${array[0]}</span> <span>${array[1]}</span>`
}

const getPaymentMethods = (paymentMethods: any[]) => {
  const methods = useDeepCopy(paymentMethods).splice(0, 4)
  return paymentMethods.length > 4 ? [...methods, { id: 5, name: `+${paymentMethods.length - 4}` }] : methods
}
</script>

<style scoped lang="scss">
@import "../table";
@import "purchaseAnnouncement";
</style>