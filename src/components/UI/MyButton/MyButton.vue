<template>
  <div class="my-button" :class="props.type">
    {{ props.name }}

    <div class="my-button__legend" v-if="props.legend">{{ props.legend }}</div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<'primary-btn' | 'success-btn' | 'neutral-btn'>,
    default: 'primary-btn'
  },
  name: {
    type: String,
    default: 'Name'
  },
  legend: {
    type: Number || String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.my-button {
  padding: 7px 12px;
  width: fit-content;
  border: 1px solid transparent;
  border-radius: 8px;
  @include get-font(12px, 500, 16px);
  transition: .25s all ease;
  cursor: pointer;
  position: relative;

  &__legend {
    @include flex-center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: $bg-violet;
    @include get-font(10px, 700, 12px, $text-base-on-color);
    position: absolute;
    top: -5px;
    right: -5px;
  }

  &.primary-btn {
    background: $bg-primary-default;
    color: $text-base-on-color;
  }

  &.success-btn {
    border-color: $border-green-secondary;
    color: $text-base-light;

    &.active-btn {
      background: $bg-green-secondary;
      color: $text-base;
    }
  }

  &.neutral-btn {
    border-color: $border-base-dark-light-secondary;
    color: $text-base-light;
  }
}
</style>