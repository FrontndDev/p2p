<template>
  <template v-if="showTable">
    <div class="my-table my-purchases-and-deals">
      <div class="my-purchases-and-deals__row my-table__row my-table__row_headers">
        <div>{{ props.type === 'purchases' ? 'Продавец' : 'Покупатель' }}</div>
        <div>Количество / Сумма</div>
        <div>Статус</div>
        <div>ID ордера</div>
        <div>Дата / Время</div>
      </div>

      <div class="my-purchases-and-deals__row my-table__row" v-for="row in data?.list" :key="row.id">
        <div class="my-purchases-and-deals__seller">
          <Seller
              :name="getName(row.name)"
              :avatar="row.avatar"
              :statistics="row.statistics"
          />
        </div>
        <div class="my-purchases-and-deals__info">
          <div class="my-purchases-and-deals__info-count bg-currency small-icon" :class="`currency-${row.wallet}`">
            {{ row.count }}
          </div>
          <div class="my-purchases-and-deals__info-sum">{{ row.sum }}</div>
        </div>
        <div class="my-purchases-and-deals__status" :class="row.status">{{ row.statusTranslate }}</div>
        <div class="my-purchases-and-deals__order-id">
          <span>ID ордера</span>

          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.34949 4.69832C1.02686 5.02095 0.837209 5.56687 0.837209 6.50233V8.84651C0.837209 9.78197 1.02686 10.3279 1.34949 10.6505C1.67211 10.9731 2.21803 11.1628 3.15349 11.1628H5.49767C6.43313 11.1628 6.97905 10.9731 7.30168 10.6505C7.6243 10.3279 7.81395 9.78197 7.81395 8.84651V6.50233C7.81395 5.56687 7.6243 5.02095 7.30168 4.69832C6.97905 4.3757 6.43313 4.18605 5.49767 4.18605H3.15349C2.21803 4.18605 1.67211 4.3757 1.34949 4.69832ZM0.75749 4.10633C1.31394 3.54988 2.13546 3.34884 3.15349 3.34884H5.49767C6.51571 3.34884 7.33723 3.54988 7.89367 4.10633C8.45012 4.66278 8.65116 5.48429 8.65116 6.50233V8.84651C8.65116 9.86454 8.45012 10.6861 7.89367 11.2425C7.33723 11.799 6.51571 12 5.49767 12H3.15349C2.13546 12 1.31394 11.799 0.75749 11.2425C0.201043 10.6861 0 9.86454 0 8.84651V6.50233C0 5.48429 0.201043 4.66278 0.75749 4.10633Z" fill="#1A86E5"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69832 1.34949C4.3757 1.67211 4.18605 2.21803 4.18605 3.15349V3.34884H5.49767C6.51571 3.34884 7.33723 3.54988 7.89367 4.10633C8.45012 4.66278 8.65116 5.48429 8.65116 6.50233V7.81395H8.84651C9.78197 7.81395 10.3279 7.6243 10.6505 7.30168C10.9731 6.97905 11.1628 6.43313 11.1628 5.49767V3.15349C11.1628 2.21803 10.9731 1.67211 10.6505 1.34949C10.3279 1.02686 9.78197 0.837209 8.84651 0.837209H6.50233C5.56687 0.837209 5.02095 1.02686 4.69832 1.34949ZM4.10633 0.75749C4.66278 0.201043 5.48429 0 6.50233 0H8.84651C9.86454 0 10.6861 0.201043 11.2425 0.75749C11.799 1.31394 12 2.13546 12 3.15349V5.49767C12 6.51571 11.799 7.33723 11.2425 7.89367C10.6861 8.45012 9.86454 8.65116 8.84651 8.65116H8.23256C8.00137 8.65116 7.81395 8.46375 7.81395 8.23256V6.50233C7.81395 5.56687 7.6243 5.02095 7.30168 4.69832C6.97905 4.3757 6.43313 4.18605 5.49767 4.18605H3.76744C3.53625 4.18605 3.34884 3.99863 3.34884 3.76744V3.15349C3.34884 2.13546 3.54988 1.31394 4.10633 0.75749Z" fill="#1A86E5"/>
          </svg>

          {{ row.orderId }}
        </div>
        <div class="my-purchases-and-deals__date">
          <span>Дата</span>
          <span>{{ row.date }}</span>|<span>{{ row.time }}</span>
        </div>

        <div class="my-purchases-and-deals__button">
          <MyButton
              width="100%"
              type="neutral-btn"
              name="Подробнее"
              :legend="row?.legend"
              v-if="props.type === 'purchases'"
              @click="emit('more-details', row.orderId)"
          />
          <MyButton
              width="100%"
              type="primary-btn"
              name="Принять"
              :legend="row?.legend"
              v-if="props.type === 'deals'"
              @click="emit('accept', row.orderId)"
          />
        </div>
      </div>
    </div>
    <Pagination
        :count="data.totalPages"
        :selected-page="selectedPage"
        v-if="data.totalPages > 1"
        @select-page="selectPage"
    />
  </template>
  <Preloader style="margin-bottom: 12px;" :with-text="true" v-else-if="isLoading"/>
  <template v-else>
    <div style="padding: 0 24px 12px;">{{ getTextIfThereIsNoData }}</div>
  </template>
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  onMounted,
  PropType,
  ref,
} from "vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import Seller from "@/components/Seller/Seller.vue";
import Pagination from "@/components/UI/Pagination/Pagination.vue";
import { useStore } from "vuex";
import { ITransactionsHistory } from "@/interfaces/store/modules/transactions.interface.ts";
import Preloader from "@/components/UI/Preloader/Preloader.vue";
import { IProfileAds } from "@/interfaces/store/modules/profile.interface.ts";

const props = defineProps({
  type: {
    type: String as PropType<'purchases' | 'deals'>,
    default: 'purchases',
  }
});

const emit = defineEmits(['more-details', 'accept'])

const store = useStore();

const selectedPage = ref(1);

const transactionsHistory: ComputedRef<ITransactionsHistory> = computed(() => store.state.transactions.transactionsHistory);
const profileAds: ComputedRef<IProfileAds> = computed(() => store.state.profile.ads);

const showTable = computed(() => {
  switch (props.type) {
    case 'purchases':
      return transactionsHistory.value?.transactions?.length
    case 'deals':
      return profileAds.value?.ads?.length
  }
})

const isLoading = computed(() => {
  switch (props.type) {
    case 'purchases':
      return !transactionsHistory.value?.transactions
    case 'deals':
      return !profileAds.value?.ads
  }
})

const getTextIfThereIsNoData = computed(() => {
  switch (props.type) {
    case 'purchases':
      return 'Список покупок пуст'
    case 'deals':
      return 'Список сделок пуст'
  }
});

const getPaginationInfo = (obj: { currentPage: number; totalPages: number; }) => {
  return {
    currentPage: obj.currentPage,
    totalPages: obj.totalPages,
  }
}

const getDate = (date: string) => date.split('|');
const getDateSecond = (date: string) => {
  const splitted = date.split(' ')
  const num = splitted[0].split('-').reverse().join('.')
  const time = splitted[1].slice(0, 5)
  return [num, time];
}

const data = computed(() => {
  switch (props.type) {
    case 'purchases':
      return {
        ...getPaginationInfo(transactionsHistory.value),
        list: transactionsHistory.value.transactions.map(transaction => ({
          id: transaction.id,
          wallet: transaction.innerCurrency,
          name: `${transaction.seller.firstName} ${transaction.seller.lastName}`,
          avatar: transaction.seller.avatar,
          count: transaction.amount,
          sum: `${transaction.price.amount} ${transaction.price.currency}`,
          status: transaction.status.name,
          statusTranslate: transaction.statusTransaction?.split(' ')?.[0],
          orderId: transaction.id,
          date: getDate(transaction.createdAt)[0],
          time: getDate(transaction.createdAt)[1],
          legend: 0,
          statistics: transaction.seller.statistics
        }))
      };
    case 'deals':
      return {
        ...getPaginationInfo(profileAds.value),
        list: profileAds.value.ads.map(ad => ({
          id: ad.id,
          wallet: ad.innerCurrency,
          name: `${ad.adsAuthor.first_name} ${ad.adsAuthor.last_name}`,
          avatar: ad.adsAuthor.avatar,
          count: ad.activeAmount,
          sum: ad.priceToShow,
          status: ad.isActive ? 'completed' : 'canceled',
          statusTranslate: ad.isActive ? 'Активен' : 'Не активен',
          orderId: ad.id,
          date: getDateSecond(ad.createdAt)[0],
          time: getDateSecond(ad.createdAt)[1],
          legend: 0,
          statistics: null
        })),
      };
  }
});

const getName = (name: string) => {
  const array = name.split(' ')
  return `<span>${array[0]}</span> <span>${array[1]}</span>`
}

const loadData = () => {
  switch (props.type) {
    case 'purchases':
      store.dispatch('transactions/getTransactionsHistory')
      break;
    case 'deals':
      store.dispatch('profile/getAds')
      break;
  }
}

const selectPage = (page: number) => {
  selectedPage.value = page
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
@import "../table";
@import "myPurchasesAndDeals";
</style>