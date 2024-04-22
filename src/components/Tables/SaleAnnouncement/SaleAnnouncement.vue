<template>
  <template v-if="true">
    <div class="sale-announcement my-table">
      <div class="sale-announcement__row my-table__row my-table__row_headers">
        <div>Валюта</div>
        <div>Цена</div>
        <div>Способ оплаты</div>
        <div>Остаток / Лимиты</div>
        <div>Статус</div>
        <div>Дата / время</div>
      </div>

      <div class="sale-announcement__row my-table__row" v-for="row in table" :key="row.id">
        <div class="sale-announcement__wallet">
          <img alt="icon" :src="getIcon(row.wallet)">
          {{ row.wallet }}
        </div>
        <div class="sale-announcement__price">{{ row.price }} RUB</div>
        <div class="sale-announcement__payment-methods">
          <PaymentMethods
              class="flex-start"
              :payment-methods="getPaymentMethods(row.paymentMethods)"
          />
        </div>
        <div class="sale-announcement__info">
          <div class="sale-announcement__info-available">
            <span>Остаток</span>
            {{ row.available }}
            <img alt="icon" :src="getIcon(row.wallet)">
          </div>
          <div class="sale-announcement__info-limits">
            <span>Лимиты</span>
            {{ row.limits.min }} - {{ row.limits.max }} RUB
          </div>
        </div>
        <div class="sale-announcement__status" :class="row.status">{{ StatusesEnum[row.status] }}</div>
        <div class="sale-announcement__date">
          <span>Дата</span>
          <span>{{ row.date }}</span>|<span>{{ row.time }}</span>
        </div>
        <div class="sale-announcement__edit-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3451 0.957928C11.1229 0.858464 11.9098 1.17654 12.7094 1.92891L12.7104 1.92978C13.5127 2.6885 13.8779 3.45817 13.8231 4.24209C13.7701 4.99959 13.331 5.64073 12.8303 6.16976M12.8303 6.16976L7.35964 11.9602C7.20542 12.1282 6.99776 12.2704 6.80089 12.3757C6.6015 12.4823 6.37086 12.5735 6.15433 12.612L6.151 12.6126L4.0051 12.9791C3.48472 13.0688 2.98572 12.9388 2.63025 12.6017C2.27528 12.2651 2.11843 11.7742 2.17654 11.2512L2.17671 11.2497L2.42444 9.0803C2.45322 8.8645 2.53336 8.63098 2.62783 8.4284C2.72196 8.22655 2.8504 8.01251 3.00239 7.85072L3.00336 7.84968L8.4767 2.05635C8.97772 1.5271 9.59341 1.05404 10.3451 0.957928M9.20325 2.74346L3.73124 8.53539C3.67659 8.5937 3.60152 8.70653 3.53413 8.85105C3.46795 8.99294 3.42821 9.12422 3.41629 9.2086L3.17042 11.3616L3.17034 11.3623C3.14201 11.6189 3.22176 11.7845 3.31837 11.8761C3.41457 11.9673 3.58223 12.0373 3.83519 11.9937L3.83596 11.9935L5.9807 11.6272C6.06422 11.6121 6.19289 11.5668 6.3294 11.4938C6.46779 11.4198 6.57189 11.34 6.624 11.2828L6.62997 11.2763L12.1034 5.48302C12.5491 5.01212 12.7968 4.58302 12.8255 4.17236C12.8524 3.78805 12.6944 3.29121 12.0238 2.65685C11.3569 2.02952 10.854 1.90099 10.4719 1.94985C10.0636 2.00206 9.6488 2.27287 9.20325 2.74346Z" fill="#7B879D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.84953 2.872C8.12238 2.82949 8.37803 3.01622 8.42054 3.28907C8.67196 4.90281 9.98164 6.13789 11.6099 6.30189C11.8847 6.32956 12.085 6.57473 12.0573 6.84948C12.0296 7.12423 11.7845 7.32453 11.5097 7.29685C9.43136 7.08752 7.75438 5.50926 7.43246 3.44301C7.38995 3.17016 7.57668 2.91451 7.84953 2.872Z" fill="#7B879D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 14.6661C1.5 14.39 1.72386 14.1661 2 14.1661H14C14.2761 14.1661 14.5 14.39 14.5 14.6661C14.5 14.9422 14.2761 15.1661 14 15.1661H2C1.72386 15.1661 1.5 14.9422 1.5 14.6661Z" fill="#7B879D"/>
          </svg>
        </div>
      </div>
    </div>
    <Pagination/>
  </template>
  <template v-else>
    <div style="padding: 0 24px 12px;">Нет доступных объявлений</div>
  </template>
</template>

<script setup lang="ts">
import USDIcon from '@/assets/svg/wallets/usd.svg';
import TONIcon from '@/assets/svg/wallets/ton.svg';
import {
  reactive
} from "vue";
import { useDeepCopy } from "@/composables/useDeepCopy.ts";
import {
  SecondStatusesEnum,
  StatusesEnum
} from "@/enums/statuses.enum.ts";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import Pagination from "@/components/UI/Pagination/Pagination.vue";

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
    status: SecondStatusesEnum["in-process"],
    date: '28.02.2024',
    time: '23:30',
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
    status: SecondStatusesEnum["in-process"],
    date: '28.02.2024',
    time: '23:30',
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
    status: SecondStatusesEnum.completed,
    date: '28.02.2024',
    time: '23:30',
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
    status: SecondStatusesEnum.canceled,
    date: '28.02.2024',
    time: '23:30',
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
  const methods = useDeepCopy(paymentMethods).splice(0, 4)
  return paymentMethods.length > 4 ? [...methods, { id: 5, name: `+${paymentMethods.length - 4}` }] : methods
}
</script>

<style scoped lang="scss">
@import "../table";
@import "saleAnnouncement";
</style>