<template>
  <div class="main-layout-header title-h1">
    <div class="main-layout-title">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="goBack">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5302 3.54975C15.8231 3.84264 15.8231 4.31752 15.5302 4.61041L9.01017 11.1304C8.53307 11.6075 8.53307 12.3926 9.01017 12.8697L15.5302 19.3897C15.8231 19.6826 15.8231 20.1575 15.5302 20.4504C15.2373 20.7433 14.7624 20.7433 14.4695 20.4504L7.94951 13.9304C6.88662 12.8675 6.88662 11.1326 7.94951 10.0697L14.4695 3.54975C14.7624 3.25685 15.2373 3.25685 15.5302 3.54975Z" fill="#7B879D"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5302 3.54975C15.8231 3.84264 15.8231 4.31752 15.5302 4.61041L9.01017 11.1304C8.53307 11.6075 8.53307 12.3926 9.01017 12.8697L15.5302 19.3897C15.8231 19.6826 15.8231 20.1575 15.5302 20.4504C15.2373 20.7433 14.7624 20.7433 14.4695 20.4504L7.94951 13.9304C6.88662 12.8675 6.88662 11.1326 7.94951 10.0697L14.4695 3.54975C14.7624 3.25685 15.2373 3.25685 15.5302 3.54975Z" fill="#7B879D"/>
      </svg>

      <template v-if="transactionInfo?.innerCurrency">
        Купить {{ transactionInfo?.innerCurrency ?? '...' }}
      </template>
    </div>

    <div class="main-layout-action" v-if="route.meta.action">{{ route.meta.action }}</div>
  </div>

  <div class="main-layout">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import {
  useRoute,
  useRouter
} from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const route: any = useRoute();
const store = useStore();

const transactionInfo = computed(() => store.state.transactions.transactionInfo);

const goBack = () => {
  router.push(localStorage.getItem('prevPage'))
}
</script>

<style scoped lang="scss">
@import "mainLayout";
</style>