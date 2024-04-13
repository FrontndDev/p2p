<template>
  <BottomPopup title="Реквизиты">
    <template #content>
      <div class="requisites-popup">
        <div class="requisites-popup__content">
          <div
              class="requisites-popup__item"
              v-for="item in 12"
              :key="item"
          >
            <div class="requisites-popup__left">
              <div class="requisites-popup__item-bank">Сбербанк</div>
              <div class="requisites-popup__item-down">
                <img src="@/assets/images/rub.png" alt="rub" class="requisites-popup__item-wallet">
                <div class="requisites-popup__item-card-num">4523 *** **** 0254</div>
              </div>
            </div>
            <EditIcon/>
          </div>

          <MyButton type="second-primary-btn" size="big" width="100%" name="Добавить реквизиты"/>
        </div>
      </div>
    </template>
    <template #footer>
      <MyButton size="big" width="100%" name="Продолжить" :disabled="true"/>
    </template>
  </BottomPopup>
</template>

<script setup lang="ts">
// @ts-ignore
import EditIcon from '@/assets/svg/edit.svg?component';

import BottomPopup from "@/components/BottomPopups/BottomPopup.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.requisites-popup {
  width: 100%;

  &__content {
    @include flexbox(column);
    row-gap: 8px;
  }

  &__item {
    @include flexbox(row, space-between, center);
    padding: 13px 16px;
    width: 100%;
    border-radius: 16px;
    border: 1px solid $border-base-light;

    &__left {
      @include flexbox(column);
      row-gap: 2px;
    }

    &-bank {
      @include get-font(12px, 500, 16px, $text-base-light);
    }

    &-down {
      @include flexbox(row, flex-start, center);
      column-gap: 8px;
    }

    &-wallet {
      width: 16px;
      height: 16px;
      object-fit: cover;
    }

    &-card-num {
      @include get-font(14px, 500, 20px, $text-base);
    }
  }
}
</style>