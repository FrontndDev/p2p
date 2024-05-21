<template>
  <div class="deal">
    <div class="deal__up">
      <div class="deal__header">
        <div class="deal__title">
          <div class="deal__icon" :class="dealType">
            <component :is="getMessageTimeIcon"/>
          </div>
          {{ transactionInfo.statusTransaction ?? 'Загрузка...' }}
        </div>
        <div class="deal__timer" v-if="props.expiredIn">
          <div class="deal__timer-item">{{ minutes }}</div>
          <div class="deal__timer-colon">
            <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg" v-for="item in 2" :key="item">
              <circle cx="1" cy="1" r="1" fill="#191B2A"/>
            </svg>
          </div>
          <div class="deal__timer-item">{{ seconds }}</div>
        </div>
      </div>
      <div class="deal__text" v-for="item in getDescription">{{ item }}</div>

      <div
          class="deal__progressbar my-content-container"
          v-if="showProgressBar"
      >
        <Progressbar :status="dealType"/>
      </div>
      <SellerDetails
          :payment-method="transactionInfo.requisite.paymentMethod"
          :price="transactionInfo.price"
          :seller="transactionInfo.seller"
          v-if="[DealEnum.accepted].includes(dealType)"
      />
    </div>

    <div class="deal__info">
      <div class="deal__info-header">
        <div class="deal__info-title">Информация о сделке</div>
        <AdditionalInfo :id="transactionInfo.id" :date="getDate?.[0]" :time="getDate?.[1]"/>
      </div>

      <div class="deal__info-item">
        <div class="deal__info-item-title">Вы отдаете</div>
        <div class="deal__info-item-value price">{{ transactionInfo.price?.amount }} {{ transactionInfo.price?.currency }}</div>
      </div>
      <div class="deal__info-item">
        <div class="deal__info-item-title">Вы получаете</div>
        <div class="deal__info-item-value bg-currency small-icon" :class="`currency-${transactionInfo.outerCurrencyAmount?.currency}`">
          {{ transactionInfo.outerCurrencyAmount?.amount }}
        </div>
      </div>
      <div class="deal__info-item">
        <div class="deal__info-item-title">Способ оплаты</div>
        <PaymentMethods
            :payment-methods="[{ id: transactionInfo.requisite.id, name: transactionInfo.requisite.paymentMethod }]"
            v-if="transactionInfo.requisite"
        />
      </div>
      <div class="deal__info-item">
        <div class="deal__info-item-title">Окно оплаты</div>
        <div class="deal__info-item-value">{{ transactionInfo.status?.expirationTime }} минут</div>
      </div>

      <div class="deal__buttons">
        <MyButton
            type="neutral-btn"
            size="big"
            width="50%"
            name="Отменить сделку"
            :disabled="!transactionInfo.canBeCanceled"
            v-if="[DealEnum.pending, DealEnum.accepted].includes(dealType)"
            @click="cancelDeal"
        />
<!--        <MyButton-->
<!--            type="neutral-btn"-->
<!--            size="big"-->
<!--            width="50%"-->
<!--            name="Обратиться в поддержку"-->
<!--            v-else-->
<!--            @click="cancelDeal"-->
<!--        />-->
        <MyButton
            size="big"
            name="Вернуться к объявлениям"
            :width="![DealEnum.pending, DealEnum.accepted].includes(dealType) ? '100%' : '50%'"
            :type="activeBtn ? 'second-primary-btn' : 'neutral-btn'"
            @click="goToAds"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Deal Type Icons
// @ts-ignore
import ClockIcon from '@/assets/svg/deal/clock.svg?component';
// @ts-ignore
import ExclamationIcon from '@/assets/svg/deal/exclamation.svg?component';
// @ts-ignore
import CheckMarkIcon from '@/assets/svg/deal/check-mark.svg?component';
// @ts-ignore
import CrossIcon from '@/assets/svg/deal/cross.svg?component';
// @ts-ignore
import DisputeIcon from '@/assets/svg/deal/dispute.svg?component';
//
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import {
  computed,
  Ref
} from "vue";
import { DealEnum } from "@/views/BuyCurrency/Deal/deal.enum.ts";
import Progressbar from "@/components/Progressbar/Progressbar.vue";
import SellerDetails from "@/components/SellerDetails/SellerDetails.vue";
import AdditionalInfo from "@/components/UI/AdditionalInfo/AdditionalInfo.vue";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import { useStore } from "vuex";
import {
  useRoute,
  useRouter
} from "vue-router";

const props = defineProps({
  expiredIn: {
    type: Number,
    default: 0,
  }
});

const store = useStore();
const router = useRouter();
const route = useRoute();

const transactionInfo = computed(() => store.state.transactions.transactionInfo);

const minutes = computed(() => {
  const min = Math.floor(props.expiredIn / 60)
  return min < 10 ? `0${min}` : min
});

const seconds = computed(() => {
  const sec = props.expiredIn % 60
  return sec < 10 ? `0${sec}` : sec
});

const dealType: Ref<DealEnum> = computed(() => transactionInfo.value.status?.name);

const activeBtn = computed(() =>
    [DealEnum.completed, DealEnum.cancelled, DealEnum.declined, DealEnum.expired, DealEnum.error].includes(dealType.value)
);

const showProgressBar = computed(() =>
    [DealEnum.accepted, DealEnum.payed, DealEnum.declined, DealEnum.payment_confirmation_expired].includes(dealType.value)
)

const getMessageTimeIcon = computed(() => {
  switch (dealType.value) {
    case DealEnum.pending:
      return ClockIcon;
    case DealEnum.accepted:
    case DealEnum.payed:
      return ExclamationIcon;
    case DealEnum.completed:
      return CheckMarkIcon;
    case DealEnum.expired:
    case DealEnum.payment_confirmation_expired:
    case DealEnum.cancelled:
    case DealEnum.error:
    case DealEnum.declined:
      return CrossIcon;
    default:
      return ExclamationIcon;
    // case DealEnum.dispute:
    //   return DisputeIcon;
  }
});

const getDate = computed(() => transactionInfo.value.createdAt?.split('|'));

const getDescription = computed(() => {
  switch (dealType.value) {
    case DealEnum.pending:
      return [
        `Для осуществления сделки необходимо дождаться подтверждение продавца в течении ${transactionInfo.value.status?.expirationTime ?? 15} минут`,
        'Сделка будет автоматически отменена, если продавец не подтвердит ее в установленный срок'
      ];
    case DealEnum.accepted:
      return [];
    case DealEnum.payed:
    case DealEnum.completed:
      return [`Ваш платеж получен, актив ${transactionInfo.value.outerCurrencyAmount?.currency} был отправлен на ваш аккаунт`];
    case DealEnum.cancelled:
      return ['Продавец не успел подтвердить заявку в течение 15 минут'];
    case DealEnum.error:
      return ['Ошибка'];
    case DealEnum.declined:
    case DealEnum.payment_confirmation_expired:
      return ['Вы отметили ордер как оплаченный. Дождитесь подтверждения и перевода актива от продавца'];
    case DealEnum.expired:
      return [`Продавец не успел подтвердить заявку в течении ${transactionInfo.value.status?.expirationTime ?? 15} минут`];
  }
});

const cancelDeal = async () => {
  if (transactionInfo.value.canBeCanceled) {
    await store.dispatch('profile/cancelDeal', +route.params.transactionId);
    await router.push({ name: 'purchase' })
  }
}

const goToAds = () => {
  router.push(localStorage.getItem('prevPage'))
}
</script>

<style scoped lang="scss">
@import "deal";
</style>