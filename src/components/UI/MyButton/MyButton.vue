<template>
  <div class="my-button">Купить TON</div>
</template>

<script setup lang="ts">
const props = defineProps({

})
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.my-button {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid $border-green-secondary;
  @include get-font(12px, 500, 16px, $text-base-light);
  cursor: pointer;

  &.active-button {
    background: $bg-green-secondary;
    color: $text-base;
  }
}
</style>