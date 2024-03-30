<template>
  <div class="telegram-banner">
    <img src="@/assets/images/telegram-banner.png" alt="tg">
    <span>Для участия в сделках необходимо подключение к Telegram Bot</span>
    <div class="telegram-banner__button">
      <MyButton type="second-success-btn" width="100%" name="Привязать"/>
    </div>
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

@media screen and (max-width: 756px) {
  .telegram-banner {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 224px 56px;
    grid-template-areas: "text icon" "button button";

    & > img {
      grid-area: icon;
      width: 56px;
      height: 56px;
    }

    & > span {
      grid-area: text;
    }

    &__button {
      grid-area: button;
      margin-top: 16px;
      width: 100%;
    }
  }
}
</style>