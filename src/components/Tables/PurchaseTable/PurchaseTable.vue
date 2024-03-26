<template>
  <div class="purchase-table">
    <div class="purchase-table__row purchase-table__row_headers">
      <div>Продавец</div>
      <div>Валюта</div>
      <div>Цена</div>
      <div>Способ оплаты</div>
      <div>Доступно / Лимиты</div>
    </div>

    <div class="purchase-table__row">
      <div class="purchase-table__seller">
        <img
            src="http://localhost:5173/app/p2p/Social%20Lift%20-%20%D0%B4%D0%BE%D1%85%D0%BE%D0%B4%D0%BD%D1%8B%D0%B5%20%D1%81%D0%B2%D1%8F%D0%B7%D0%BA%D0%B8_files/2969585.blockies.jpg"
            alt="avatar"
            class="purchase-table__seller-avatar"
        >

        <div class="purchase-table__seller-info">
          <div class="purchase-table__seller-name">Константин Константинопольский</div>
          <div class="purchase-table__seller-description">
            <div>145 успешных</div>
            <span>|</span>
            <div>100% выполнено</div>
          </div>
        </div>
      </div>
      <div class="purchase-table__wallet">
        <USDIcon/>
        USD
      </div>
      <div class="purchase-table__price">1 000 000 RUB</div>
      <div class="purchase-table__payment-methods">
        <div class="purchase-table__payment-methods-item">Тинькофф</div>
        <div class="purchase-table__payment-methods-item">Райфайзен</div>
        <div class="purchase-table__payment-methods-item">Сбербанк</div>
        <div class="purchase-table__payment-methods-item">Альфа</div>
        <div class="purchase-table__payment-methods-item">+3</div>
      </div>
      <div class="purchase-table__info">
        <div class="purchase-table__info-available">
          1 000 000
          <TONIcon/>
        </div>
        <div class="purchase-table__info-limits">1 000 000 - 999 999 999 RUB</div>
      </div>
      <div class="purchase-table__button">
        <MyButton/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import USDIcon from '@/assets/svg/wallets/usd.svg?component';
import TONIcon from '@/assets/svg/wallets/ton.svg?component';
import MyButton from "@/components/UI/MyButton/MyButton.vue";
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.purchase-table {
  width: 100%;

  &__row {
    display: grid;
    grid-template-columns: 304px 88px 112px 172px 174px 102px;
    grid-column-gap: 40px;
    padding: 17px 24px;

    &_headers {
      padding: 16px 24px;
      border-top: 1px solid $border-base-light;
      border-bottom: 1px solid $border-base-light;
      @include get-font(14px, 500, 20px, $text-base-light);
    }

    & > div {
      @include flexbox(row, flex-start, center);
    }
  }

  &__seller {
    @include flexbox(row);
    column-gap: 12px;

    &-avatar {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 8px;
    }

    &-info {
      @include flexbox(column);
      row-gap: 2px;
      width: 100%;
      overflow: hidden;
    }

    &-name {
      width: 100%;
      @include get-font(16px, 500, 24px, $text-base);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-description {
      @include flex-center;
      column-gap: 8px;
      @include get-font(14px, 500, 20px, $text-base-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      & > span {
        @include get-font(14px, 500, 20px, $text-base-disable);
      }
    }
  }

  &__wallet {
    column-gap: 8px;
  }

  &__price {
    @include get-font(14px, 700, 20px, $text-base);
  }

  &__payment-methods {
    @include flexbox(row, center, center, wrap !important);
    gap: 4px;

    &-item {
      padding: 4px 8px;
      max-width: 80px;
      width: fit-content;
      border-radius: 4px;
      background: $bg-base-secondary;
      overflow: hidden;
      @include get-font(10px, 700, 12px, $text-base-light);
      text-overflow: ellipsis;
      text-transform: uppercase;
    }
  }

  &__info {
    @include flexbox(column !important, flex-start, flex-start !important);

    &-available {
      @include flex-center;
      column-gap: 8px;
      @include get-font(14px, 500, 20px, $text-base);
    }

    &-limits {
      @include get-font(12px, 500, 16px, $text-base-light);
    }
  }
}
</style>