<template>
  <div class="information-about-transfers">
    <div class="information-about-transfers__item" v-for="item in data" :key="item.id">
      <div class="information-about-transfers__item-title" v-html="getTitle(item.title)"/>
      <div class="information-about-transfers__item-value">{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  reactive
} from "vue";
import { useStore } from "vuex";

const store = useStore();

const statistics = computed(() => store.state.profile.profile?.statistics);

const data = reactive([
  {
    id: 1,
    title: 'Всего сделок',
    value: computed(() => statistics.value?.transactionsCount ?? 0)
  },
  {
    id: 2,
    title: 'Процент успешных',
    value: computed(() => statistics.value?.successPercent + '%')
  },
  {
    id: 3,
    title: 'Скорость перевода',
    value: computed(() => {
      const value = (statistics.value?.releaseTime / 60).toFixed(0)
      return +value ? value + ' min' : '0 min'
    })
  },
  {
    id: 4,
    title: 'Скорость оплаты',
    value: computed(() => {
      const value = (statistics.value?.paymentTime / 60).toFixed(0)
      return +value ? value + ' min' : '0 min'
    })
  },
]);

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

@media screen and (max-width: 756px) {
  .information-about-transfers {
    justify-content: flex-start;
    overflow: auto;

    &::-webkit-scrollbar {
      height: 0;
    }

    &__item {
      flex-shrink: 0;
      width: 144px;
    }
  }
}
</style>