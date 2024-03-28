<template>
  <div class="telegram-banner">
    <img src="@/assets/images/telegram-banner.png" alt="tg">
    Для участия в сделках необходимо подключение к Telegram Bot
    <MyButton type="second-success-btn" name="Привязать"/>
  </div>
</template>

<script setup lang="ts">

import MyButton from "@/components/UI/MyButton/MyButton.vue";
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.telegram-banner {
  @include flex-center;
  column-gap: 16px;
  padding: 16px;
  width: 100%;
  border-radius: 16px;
  background: $bg-base;
  @include get-font(14px, 500, 20px, $text-base);

  & > img {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }
}
</style>