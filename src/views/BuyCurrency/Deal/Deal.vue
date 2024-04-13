<template>
  <div class="deal">
    <div class="deal__up">
      <div class="deal__header">
        <div class="deal__title">
          <div class="deal__icon" :class="dealType">
            <component :is="getMessageTimeIcon"/>
          </div>
          Подтверждение заявки продавцом
        </div>
        <div class="deal__timer">
          <div class="deal__timer-item">14</div>
          <div class="deal__timer-colon">
            <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg" v-for="item in 2" :key="item">
              <circle cx="1" cy="1" r="1" fill="#191B2A"/>
            </svg>
          </div>
          <div class="deal__timer-item">59</div>
        </div>
      </div>
      <div class="deal__text">Для осуществления сделки необходимо дождаться подтверждение продавца в течении 15 минут</div>
      <div class="deal__text">Сделка будет автоматически отменена, если продавец не подтвердит ее в установленный срок</div>

      <div class="deal__progressbar my-content-container">
        <Progressbar/>
      </div>
      <SellerDetails/>
    </div>

    <div class="deal__info">
      <div class="deal__info-header">
        <div class="deal__info-title">Информация о сделке</div>
        <AdditionalInfo date="28.02.2024" time="18:01" id="12357413255"/>
      </div>

      <div class="deal__info-item">
        <div class="deal__info-item-title">Вы отдаете</div>
        <div class="deal__info-item-value price">1 000 000 RUB</div>
      </div>
      <div class="deal__info-item">
        <div class="deal__info-item-title">Вы получаете</div>
        <div class="deal__info-item-value">
          1 000 000 RUB
          <USDIcon/>
        </div>
      </div>
      <div class="deal__info-item">
        <div class="deal__info-item-title">Способ оплаты</div>
        <PaymentMethods :payment-methods="[{ id: 1, name: 'Сбербанк' }]"/>
      </div>
      <div class="deal__info-item">
        <div class="deal__info-item-title">Окно оплаты</div>
        <div class="deal__info-item-value">15 минут</div>
      </div>

      <div class="deal__buttons">
        <MyButton type="neutral-btn" size="big" width="50%" name="Отменить сделку"/>
        <MyButton
            type="neutral-btn"
            size="big"
            width="50%"
            name="Вернуться к объявлениям"
            @click="$router.push({ name: 'purchase' })"
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
// @ts-ignore
import USDIcon from '@/assets/svg/wallets/usd.svg?component';
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import { TDealType } from "@/views/BuyCurrency/Deal/deal.interface.ts";
import {
  computed,
  ref,
  Ref
} from "vue";
import { DealEnum } from "@/views/BuyCurrency/Deal/deal.enum.ts";
import Progressbar from "@/components/Progressbar/Progressbar.vue";
import SellerDetails from "@/components/SellerDetails/SellerDetails.vue";
import AdditionalInfo from "@/components/UI/AdditionalInfo/AdditionalInfo.vue";
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";

const dealType: Ref<TDealType> = ref(DealEnum.confirmationApplication);

const getMessageTimeIcon = computed(() => {
  switch (dealType.value) {
    case DealEnum.confirmationApplication:
      return ClockIcon;
    case DealEnum.confirmationPayment:
      return ExclamationIcon;
    case DealEnum.completed:
      return CheckMarkIcon;
    case DealEnum.canceled:
      return CrossIcon;
    case DealEnum.dispute:
      return DisputeIcon;
  }
})
</script>

<style scoped lang="scss">
@import "deal";
</style>