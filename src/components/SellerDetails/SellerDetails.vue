<template>
  <div class="seller-details">
    <div class="my-content-container">
      <div class="seller-details__title title-h3">Реквизиты продавца</div>

      <div class="seller-details__body">
        <div class="seller-details__header">
          <RadioButton :name="props.paymentMethod"/>
        </div>
        <ol class="seller-details__content">
          <li class="seller-details__step">
            <div class="seller-details__step-line"/>
            1. Войдите в ваш аккаунт: {{ props.paymentMethod }}
          </li>
          <li class="seller-details__step">
            <div class="seller-details__step-line"/>
            2. Переведите продавцу<span @click="useCopy(props.price.amount)"><span>{{ props.price.amount }} {{ props.price.currency }}</span><CopyIcon/></span>

            <div class="seller-details__step-content">
              <div class="seller-details__step-content-item">
                <div>Имя</div>
                <div @click="useCopy(`${props.seller.firstName} ${props.seller.lastName}`)">
                  {{ props.seller.firstName }} {{ props.seller.lastName }}
                  <CopyIcon/>
                </div>
              </div>
              <div class="seller-details__step-content-item">
                <div>Реквизиты</div>
                <div @click="useCopy(props.requisite)">
                  {{ props.requisite }}
                  <CopyIcon/>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import CopyIcon from '@/assets/svg/copy.svg?component';
import RadioButton from "@/components/UI/RadioButton/RadioButton.vue";
import { PropType } from "vue";
import { IPrice } from "@/interfaces/store/modules/ads.interface.ts";
import { ISeller } from "@/interfaces/store/modules/transactions.interface.ts";
import { useCopy } from "@/composables/useCopy.ts";

const props = defineProps({
  seller: {
    type: Object as PropType<ISeller>,
    required: true,
  },
  price: {
    type: Object as PropType<IPrice>,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  requisite: {
    type: String,
    requited: true,
  }
})
</script>

<style scoped lang="scss">
@import "sellerDetails";
</style>