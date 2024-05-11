<template>
  <template v-if="ads?.ads?.length">
    <div class="my-table purchase-announcement">
      <div class="purchase-announcement__row my-table__row my-table__row_headers">
        <div>Продавец</div>
        <div>Валюта</div>
        <div>Цена</div>
        <div>Способ оплаты</div>
        <div>Доступно / Лимиты</div>
      </div>

      <div
          class="purchase-announcement__row my-table__row"
          v-for="ad in ads.ads"
          :key="ad.id"
          @click="emit('buy', ad.id)"
      >
        <div class="purchase-announcement__seller">
          <Seller
              :name="getName(ad.adsAuthor.first_name + ' ' + ad.adsAuthor.last_name)"
              :avatar="ad.adsAuthor.avatar"
              :statistics="ad.adsAuthor.statistics"
          />
        </div>
        <div class="purchase-announcement__wallet bg-currency small-icon" :class="`currency-${ad.currencyForBuy}`">
          {{ ad.currencyForBuy }}
        </div>
        <div class="purchase-announcement__price">{{ ad.priceToShow }}</div>
        <div class="purchase-announcement__payment-methods">
          <PaymentMethods
              class="flex-start"
              :payment-methods="getPaymentMethods([{ id: 1, name: ad.paymentMethod.name }])"
          />
        </div>
        <div class="purchase-announcement__info">
          <div class="purchase-announcement__info-available bg-currency small-icon" :class="`currency-${ad.outerCurrency}`">
            <span>Сумма</span>
            {{ ad.activeAmount }}
          </div>
          <div class="purchase-announcement__info-limits">
            <span>Лимит</span>
            {{ Object.values(ad.minAmount).join(' ') }} - {{ Object.values(ad.maxAmount).join(' ') }}
          </div>
        </div>
        <div class="purchase-announcement__button">
          <MyButton type="success-btn" :name="`Купить ${ad.currencyForBuy}`"/>
        </div>
      </div>
    </div>
    <Pagination
        :count="ads.totalPages"
        :selected-page="selectedPage"
        v-if="ads.totalPages > 1"
        @select-page="selectPage"
    />
  </template>
  <Preloader style="margin-bottom: 12px;" :with-text="true" v-else-if="!ads?.ads"/>
  <template v-else>
    <div style="padding: 0 24px 12px;">Нет доступных объявлений</div>
  </template>
</template>

<script setup lang="ts">
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import {
  computed,
  ComputedRef,
} from "vue";
import { useDeepCopy } from "@/composables/useDeepCopy.ts";
import Seller from "@/components/Seller/Seller.vue";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import { useStore } from "vuex";
import { IAds } from "@/interfaces/store/modules/ads.interface.ts";
import Pagination from "@/components/UI/Pagination/Pagination.vue";
import Preloader from "@/components/UI/Preloader/Preloader.vue";

const emit = defineEmits(['buy'])

const store = useStore();

const ads: ComputedRef<IAds> = computed(() => store.state.ads.ads)
const selectedPage: ComputedRef<number> = computed(() => store.state.ads.page)

const getName = (name: string) => {
  const array = name.split(' ')
  return `<span>${array[0]}</span> <span>${array[1]}</span>`
}

const getPaymentMethods = (paymentMethods: any[]) => {
  const methods = useDeepCopy(paymentMethods).splice(0, 4)
  return paymentMethods.length > 4 ? [...methods, { id: 5, name: `+${paymentMethods.length - 4}` }] : methods
}

const selectPage = (page: number) => {
  store.commit('ads/SET_PAGE', page)
  store.dispatch('ads/getAds')
}
</script>

<style scoped lang="scss">
@import "../table";
@import "purchaseAnnouncement";
</style>