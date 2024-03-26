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
        <img
            src="http://localhost:5173/app/p2p/Social%20Lift%20-%20%D0%B4%D0%BE%D1%85%D0%BE%D0%B4%D0%BD%D1%8B%D0%B5%20%D1%81%D0%B2%D1%8F%D0%B7%D0%BA%D0%B8_files/2969585.blockies.jpg"
            alt="avatar"
            class="purchase-announcement__seller-avatar"
        >

        <div class="purchase-announcement__seller-info">
          <div class="purchase-announcement__seller-name" :title="row.name">{{ row.name }}</div>
          <div class="purchase-announcement__seller-description">
            <div>{{ row.successful }} <template v-if="typeof row.done !== 'number'">успешных</template> сделок</div>

            <template v-if="typeof row.done === 'number'">
              <span>|</span>
              <div>{{ row.done }}% выполнено</div>
            </template>
          </div>
        </div>
      </div>
      <div class="purchase-announcement__wallet">
        <img alt="icon" :src="getIcon(row.wallet)">
        {{ row.wallet }}
      </div>
      <div class="purchase-announcement__price">{{ row.price }} RUB</div>
      <div class="purchase-announcement__payment-methods">
        <div
            class="purchase-announcement__payment-methods-item"
            v-for="method in getPaymentMethods(row.paymentMethods)"
            :key="method.id"
            :title="method.name"
        >{{ method.name }}</div>
        <div class="purchase-announcement__payment-methods-item" v-if="row.paymentMethods.length > 4">
          +{{ row.paymentMethods.length - 4 }}
        </div>
      </div>
      <div class="purchase-announcement__info">
        <div class="purchase-announcement__info-available">
          {{ row.available }}
          <img alt="icon" :src="getIcon(row.wallet)">
        </div>
        <div class="purchase-announcement__info-limits">{{ row.limits.min }} - {{ row.limits.max }} RUB</div>
      </div>
      <div class="purchase-announcement__button">
        <MyButton type="success-btn" :name="`Купить ${row.wallet}`"/>
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

const getPaymentMethods = (paymentMethods: any[]) => {
  return useDeepCopy(paymentMethods).splice(0, 4)
}
</script>

<style scoped lang="scss">
@import "../table";
@import "purchaseAnnouncement";
</style>