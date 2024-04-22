<template>
  <div class="p2p-wallets p2p-card">
    <div class="p2p-card__header title-h2">P2P кошельки</div>

    <div class="p2p-wallets__item" v-for="wallet in wallets" :key="wallet.id">
      <div class="p2p-wallets__item-wallet">
        <img src="@/assets/svg/wallets/ton.svg" alt="icon">

        <div class="p2p-wallets__item-wallet-info">
          <div class="p2p-wallets__item-wallet-count">{{ wallet.realAmount }}</div>
          <div class="p2p-wallets__item-wallet-name">{{ wallet.currency }}</div>
        </div>
      </div>

      <div class="p2p-wallets__item-info">
        <div class="p2p-wallets__item-action">
          <span>Для продажи</span>
          <span>{{ wallet.realAmount }}</span>
        </div>
        <div class="p2p-wallets__item-commission">
          <span>Комиссия</span>
          <span>
            {{ wallet.amount }}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.00388 7.75681L6.75001 5.1635H6.53596L5.31178 5.42258L5.2654 5.56491C5.31535 5.56254 5.35816 5.56136 5.39383 5.56136C5.47232 5.56136 5.53416 5.58152 5.57935 5.62185C5.62454 5.66217 5.64713 5.70843 5.64713 5.76062C5.64713 5.84365 5.62335 5.967 5.57578 6.13068L5.07989 7.83154C5.03946 7.96675 5.01924 8.07824 5.01924 8.16602C5.01924 8.29886 5.06443 8.40916 5.15481 8.49694C5.24756 8.58233 5.37124 8.62503 5.52583 8.62503C5.93015 8.62503 6.31188 8.31309 6.67102 7.68921L6.54972 7.61804C6.39988 7.84814 6.27145 8.00708 6.16442 8.09485C6.12399 8.13043 6.08356 8.14822 6.04313 8.14822C6.01934 8.14822 5.99675 8.13755 5.97534 8.1162C5.95394 8.09248 5.94324 8.06757 5.94324 8.04148C5.94324 7.9964 5.96345 7.90152 6.00388 7.75681Z" fill="#7B879D"/>
              <path d="M6.66346 4.12499C6.66346 4.41175 6.43099 4.64422 6.14423 4.64422C5.85747 4.64422 5.625 4.41175 5.625 4.12499C5.625 3.83822 5.85747 3.60576 6.14423 3.60576C6.43099 3.60576 6.66346 3.83822 6.66346 4.12499Z" fill="#7B879D"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.70455 9.0193C2.38906 9.99135 3.39517 10.7206 4.56818 11.0524C4.87581 11.1394 5.19493 11.1991 5.52273 11.2286C5.67992 11.2428 5.83912 11.25 6 11.25C7.74192 11.25 9.28569 10.4017 10.2407 9.09559C10.8754 8.22766 11.25 7.15758 11.25 6C11.25 3.1005 8.8995 0.75 6 0.75C3.1005 0.75 0.75 3.1005 0.75 6C0.75 7.12389 1.10315 8.1653 1.70455 9.0193ZM1.5 6C1.5 3.51472 3.51472 1.5 6 1.5C8.48528 1.5 10.5 3.51472 10.5 6C10.5 6.99312 10.1792 7.90911 9.63529 8.6529C8.81543 9.77414 7.49253 10.5 6 10.5C5.86162 10.5 5.72489 10.4938 5.59004 10.4816C5.3089 10.4563 5.03558 10.4052 4.7723 10.3307C3.76843 10.0468 2.90535 9.42188 2.31776 8.58748C1.80247 7.85574 1.5 6.96431 1.5 6Z" fill="#7B879D"/>
            </svg>
          </span>
        </div>
      </div>

      <div class="p2p-wallets__item-buttons">
        <MyButton type="neutral-btn" width="100%" name="Вывести"/>
        <MyButton type="second-primary-btn" width="100%" name="Пополнить"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef
} from "vue";
import { IWallets } from "@/interfaces/store/modules/profile.interface.ts";

const store = useStore();

const wallets: ComputedRef<IWallets> = computed(() => store.state.profile.profile.wallets)
</script>

<style scoped lang="scss">
@import "p2pWallets";
</style>