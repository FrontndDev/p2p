<template>
  <div class="radio-button">
    <div class="radio-button__name" v-if="props.name">{{ props.name }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.radio-button {
  cursor: pointer;
  position: relative;

  &__name {
    padding-left: 28px;
    @include get-font(14px, 700, 16px, $text-base-secondary);
  }

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    border: 1px solid $border-primary-default;
    border-radius: 50%;
    position: absolute;
  }

  &::after {
    content: '';
    margin: auto;
    width: 6px;
    height: 6px;
    background: $bg-primary-default;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 5px;
  }
}
</style>