<template>
  <div class="profile-settings">
    <div class="profile-settings__header" @click="$router.push({ name: 'sale' })">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5302 3.54975C15.8231 3.84264 15.8231 4.31752 15.5302 4.61041L9.01017 11.1304C8.53307 11.6075 8.53307 12.3926 9.01017 12.8697L15.5302 19.3897C15.8231 19.6826 15.8231 20.1575 15.5302 20.4504C15.2373 20.7433 14.7624 20.7433 14.4695 20.4504L7.94951 13.9304C6.88662 12.8675 6.88662 11.1326 7.94951 10.0697L14.4695 3.54975C14.7624 3.25685 15.2373 3.25685 15.5302 3.54975Z" fill="#7B879D"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5302 3.54975C15.8231 3.84264 15.8231 4.31752 15.5302 4.61041L9.01017 11.1304C8.53307 11.6075 8.53307 12.3926 9.01017 12.8697L15.5302 19.3897C15.8231 19.6826 15.8231 20.1575 15.5302 20.4504C15.2373 20.7433 14.7624 20.7433 14.4695 20.4504L7.94951 13.9304C6.88662 12.8675 6.88662 11.1326 7.94951 10.0697L14.4695 3.54975C14.7624 3.25685 15.2373 3.25685 15.5302 3.54975Z" fill="#7B879D"/>
      </svg>

      Настройки профиля
    </div>

    <div class="profile-settings__content">
      <P2PWallets/>
      <Requisites @show-requisites-popup="showRequisitesPopup = true"/>
      <InformationAboutTransfers/>
      <TelegramBanner/>
    </div>

    <RequisitesPopup @close-popup="showRequisitesPopup = false" v-if="showRequisitesPopup"/>
  </div>
</template>

<script setup lang="ts">
import P2PWallets from "@/components/P2PWallets/P2PWallets.vue";
import Requisites from "@/components/Requisites/Requisites.vue";
import InformationAboutTransfers from "@/components/InformationAboutTransfers/InformationAboutTransfers.vue";
import TelegramBanner from "@/components/TelegramBanner/TelegramBanner.vue";
import RequisitesPopup from "@/components/BottomPopups/RequisitesPopup/RequisitesPopup.vue";
import { ref } from "vue";

const showRequisitesPopup = ref(false);
</script>

<style scoped lang="scss">
@import "profileSettings";
</style>