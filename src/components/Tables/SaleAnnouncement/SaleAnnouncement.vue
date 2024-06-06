<template>
  <template v-if="ads?.ads?.length">
    <div class="sale-announcement my-table">
      <div class="sale-announcement__row my-table__row my-table__row_headers">
        <div>ID объявления</div>
        <div>Валюта</div>
        <div>Цена</div>
        <div>Способ оплаты</div>
        <div>Остаток / Лимиты</div>
        <div>Статус</div>
        <div>Дата / время</div>
      </div>

      <div class="sale-announcement__row my-table__row" v-for="ad in ads.ads" :key="ad.id">
        <div class="sale-announcement__ad-id" @click="useCopy(ad.id)">
          <span>ID ордера</span>

          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.34949 4.69832C1.02686 5.02095 0.837209 5.56687 0.837209 6.50233V8.84651C0.837209 9.78197 1.02686 10.3279 1.34949 10.6505C1.67211 10.9731 2.21803 11.1628 3.15349 11.1628H5.49767C6.43313 11.1628 6.97905 10.9731 7.30168 10.6505C7.6243 10.3279 7.81395 9.78197 7.81395 8.84651V6.50233C7.81395 5.56687 7.6243 5.02095 7.30168 4.69832C6.97905 4.3757 6.43313 4.18605 5.49767 4.18605H3.15349C2.21803 4.18605 1.67211 4.3757 1.34949 4.69832ZM0.75749 4.10633C1.31394 3.54988 2.13546 3.34884 3.15349 3.34884H5.49767C6.51571 3.34884 7.33723 3.54988 7.89367 4.10633C8.45012 4.66278 8.65116 5.48429 8.65116 6.50233V8.84651C8.65116 9.86454 8.45012 10.6861 7.89367 11.2425C7.33723 11.799 6.51571 12 5.49767 12H3.15349C2.13546 12 1.31394 11.799 0.75749 11.2425C0.201043 10.6861 0 9.86454 0 8.84651V6.50233C0 5.48429 0.201043 4.66278 0.75749 4.10633Z" fill="#1A86E5"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69832 1.34949C4.3757 1.67211 4.18605 2.21803 4.18605 3.15349V3.34884H5.49767C6.51571 3.34884 7.33723 3.54988 7.89367 4.10633C8.45012 4.66278 8.65116 5.48429 8.65116 6.50233V7.81395H8.84651C9.78197 7.81395 10.3279 7.6243 10.6505 7.30168C10.9731 6.97905 11.1628 6.43313 11.1628 5.49767V3.15349C11.1628 2.21803 10.9731 1.67211 10.6505 1.34949C10.3279 1.02686 9.78197 0.837209 8.84651 0.837209H6.50233C5.56687 0.837209 5.02095 1.02686 4.69832 1.34949ZM4.10633 0.75749C4.66278 0.201043 5.48429 0 6.50233 0H8.84651C9.86454 0 10.6861 0.201043 11.2425 0.75749C11.799 1.31394 12 2.13546 12 3.15349V5.49767C12 6.51571 11.799 7.33723 11.2425 7.89367C10.6861 8.45012 9.86454 8.65116 8.84651 8.65116H8.23256C8.00137 8.65116 7.81395 8.46375 7.81395 8.23256V6.50233C7.81395 5.56687 7.6243 5.02095 7.30168 4.69832C6.97905 4.3757 6.43313 4.18605 5.49767 4.18605H3.76744C3.53625 4.18605 3.34884 3.99863 3.34884 3.76744V3.15349C3.34884 2.13546 3.54988 1.31394 4.10633 0.75749Z" fill="#1A86E5"/>
          </svg>

          {{ ad.id }}
        </div>
        <div class="sale-announcement__wallet bg-currency small-icon" :class="`currency-${ad.innerCurrency}`">
          {{ ad.innerCurrency }}
        </div>
        <div class="sale-announcement__price">{{ ad.priceToShow }}</div>
        <div class="sale-announcement__payment-methods">
          <PaymentMethods
              class="flex-start"
              :payment-methods="[{ id: 1, name: ad.paymentMethod.name }]"
          />
        </div>
        <div class="sale-announcement__info">
          <div class="sale-announcement__info-available bg-currency small-icon" :class="`currency-${ad.innerCurrency}`">
            <span>Остаток</span>
            {{ ad.activeAmount }}
          </div>
          <div class="sale-announcement__info-limits">
            <span>Лимиты</span>
            {{ Object.values(ad.minAmount).join(' ') }} - {{ Object.values(ad.maxAmount).join(' ') }}
          </div>
        </div>
        <div class="sale-announcement__status" :class="ad.isActive ? 'completed' : 'canceled'">{{ ad.isActive ? 'Активен' : 'Не активен' }}</div>
        <div class="sale-announcement__date">
          <span>Дата</span>
          <span>{{ getDateSecond(ad.createdAt)[0] }}</span>|<span>{{ getDateSecond(ad.createdAt)[1] }}</span>
        </div>
        <div class="sale-announcement__edit-button" @click="$router.push({ name: 'edit-ad', params: { id: ad.id } })">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3451 0.957928C11.1229 0.858464 11.9098 1.17654 12.7094 1.92891L12.7104 1.92978C13.5127 2.6885 13.8779 3.45817 13.8231 4.24209C13.7701 4.99959 13.331 5.64073 12.8303 6.16976M12.8303 6.16976L7.35964 11.9602C7.20542 12.1282 6.99776 12.2704 6.80089 12.3757C6.6015 12.4823 6.37086 12.5735 6.15433 12.612L6.151 12.6126L4.0051 12.9791C3.48472 13.0688 2.98572 12.9388 2.63025 12.6017C2.27528 12.2651 2.11843 11.7742 2.17654 11.2512L2.17671 11.2497L2.42444 9.0803C2.45322 8.8645 2.53336 8.63098 2.62783 8.4284C2.72196 8.22655 2.8504 8.01251 3.00239 7.85072L3.00336 7.84968L8.4767 2.05635C8.97772 1.5271 9.59341 1.05404 10.3451 0.957928M9.20325 2.74346L3.73124 8.53539C3.67659 8.5937 3.60152 8.70653 3.53413 8.85105C3.46795 8.99294 3.42821 9.12422 3.41629 9.2086L3.17042 11.3616L3.17034 11.3623C3.14201 11.6189 3.22176 11.7845 3.31837 11.8761C3.41457 11.9673 3.58223 12.0373 3.83519 11.9937L3.83596 11.9935L5.9807 11.6272C6.06422 11.6121 6.19289 11.5668 6.3294 11.4938C6.46779 11.4198 6.57189 11.34 6.624 11.2828L6.62997 11.2763L12.1034 5.48302C12.5491 5.01212 12.7968 4.58302 12.8255 4.17236C12.8524 3.78805 12.6944 3.29121 12.0238 2.65685C11.3569 2.02952 10.854 1.90099 10.4719 1.94985C10.0636 2.00206 9.6488 2.27287 9.20325 2.74346Z" fill="#7B879D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.84953 2.872C8.12238 2.82949 8.37803 3.01622 8.42054 3.28907C8.67196 4.90281 9.98164 6.13789 11.6099 6.30189C11.8847 6.32956 12.085 6.57473 12.0573 6.84948C12.0296 7.12423 11.7845 7.32453 11.5097 7.29685C9.43136 7.08752 7.75438 5.50926 7.43246 3.44301C7.38995 3.17016 7.57668 2.91451 7.84953 2.872Z" fill="#7B879D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 14.6661C1.5 14.39 1.72386 14.1661 2 14.1661H14C14.2761 14.1661 14.5 14.39 14.5 14.6661C14.5 14.9422 14.2761 15.1661 14 15.1661H2C1.72386 15.1661 1.5 14.9422 1.5 14.6661Z" fill="#7B879D"/>
          </svg>
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
import {
  computed,
  ComputedRef,
  onMounted,
} from "vue";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import Pagination from "@/components/UI/Pagination/Pagination.vue";
import { useStore } from "vuex";
import { IAds } from "@/interfaces/store/modules/ads.interface.ts";
import Preloader from "@/components/UI/Preloader/Preloader.vue";
import { useCopy } from "@/composables/useCopy.ts";

const store = useStore();

const ads: ComputedRef<IAds> = computed(() => store.state.profile.ads);

const selectedPage: ComputedRef<number> = computed(() => store.state.profile.page)

const getDateSecond = (date: string) => {
  const splitted = date.split(' ')
  const num = splitted[0].split('-').reverse().join('.')
  const time = splitted[1].slice(0, 5)
  return [num, time];
}

// const getPaymentMethods = (paymentMethods: any[]) => {
//   const methods = useDeepCopy(paymentMethods).splice(0, 4)
//   return paymentMethods.length > 4 ? [...methods, { id: 5, name: `+${paymentMethods.length - 4}` }] : methods
// }

const selectPage = (page: number) => {
  store.commit('profile/SET_PAGE', page)
  store.dispatch('profile/getAds')
}

onMounted(() => {
  store.dispatch('profile/getAds')
})
</script>

<style scoped lang="scss">
@import "../table";
@import "saleAnnouncement";
</style>