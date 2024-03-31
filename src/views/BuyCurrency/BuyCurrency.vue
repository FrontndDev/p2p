<template>
  <div class="buy-currency">
    <Deal/>
    <Chat/>
  </div>
</template>

<script setup lang="ts">
import Deal from "@/views/BuyCurrency/Deal/Deal.vue";
import Chat from "@/components/Chat/Chat.vue";
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixins";

.buy-currency {
  @include flexbox(row);
  column-gap: 16px;
}
</style>