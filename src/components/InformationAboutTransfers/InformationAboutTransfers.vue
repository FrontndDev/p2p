<template>
  <div class="information-about-transfers">
    <div class="information-about-transfers__item" v-for="item in data" :key="item.id">
      <div class="information-about-transfers__item-title" v-html="getTitle(item.title)"/>
      <div class="information-about-transfers__item-value">{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const data = reactive([
  {
    id: 1,
    title: 'Всего сделок',
    value: '194'
  },
  {
    id: 2,
    title: 'Процент успешных',
    value: '99,9%'
  },
  {
    id: 3,
    title: 'Скорость перевода',
    value: '1 min'
  },
  {
    id: 4,
    title: 'Скорость оплаты',
    value: '2 min'
  },
])

const getTitle = (title: string) => {
  const array = title.split(' ')
  return `<span>${array[0]}</span> <span>${array[1]}</span>`
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.information-about-transfers {
  @include flex-center;
  column-gap: 16px;
  width: 100%;

  &__item {
    @include flexbox(column);
    row-gap: 4px;
    padding: 16px;
    width: 25%;
    border-radius: 16px;
    background: $bg-base;

    &-title {
      @include flexbox(column);
      @include get-font(14px, 500, 20px, $text-base-light);
    }

    &-value {
      @include get-font(18px, 500, 28px, $text-base);
    }
  }
}
</style>