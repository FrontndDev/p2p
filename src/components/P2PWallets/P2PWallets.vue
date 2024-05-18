<template>
  <div class="p2p-wallets p2p-card">
    <div class="p2p-card__header title-h2">P2P кошельки</div>

    <div class="p2p-wallets__item" v-for="wallet in wallets" :key="wallet.id">
      <div class="p2p-wallets__item-wallet bg-currency" :class="`currency-${wallet.currency}`">
        <div class="p2p-wallets__item-wallet-info">
          <div class="p2p-wallets__item-wallet-count">{{ wallet.realAmount }}</div>
          <div class="p2p-wallets__item-wallet-name">{{ wallet.currency }}</div>
        </div>
      </div>

      <div class="p2p-wallets__item-info">
        <div class="p2p-wallets__item-action">
          <span>Для продажи</span>
          <span>{{ wallet.amount }}</span>
        </div>
        <div class="p2p-wallets__item-commission">
          <span>Комиссия</span>
          <span>
            {{ wallet.feeAmount }}
          </span>
        </div>
      </div>

      <div class="p2p-wallets__item-buttons">
        <MyButton
            type="neutral-btn"
            width="100%"
            name="Вывести"
            @click="withdraw(wallet)"
        />
        <MyButton
            type="second-primary-btn"
            width="100%"
            name="Пополнить"
            @click="replenish(wallet)"
        />
      </div>
    </div>

    <!--  Пополнение кошелька   -->
    <WalletReplenishmentModal
        :selected-wallet="selectedWallet"
        v-if="showWalletReplenishmentModal && selectedWallet"
        @close-modal="showWalletReplenishmentModal = false"
        @select-wallet="(wallet: IWallet) => selectedWallet = wallet"
    />
    <!--  Вывод средств   -->
    <WithdrawalFundsModal
        :selected-wallet="selectedWallet"
        v-if="showWithdrawalFundsModal && selectedWallet"
        @close-modal="showWithdrawalFundsModal = false"
        @select-wallet="(wallet: IWallet) => selectedWallet = wallet"
    />
  </div>
</template>

<script setup lang="ts">
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
  Ref,
  ref
} from "vue";
import {
  IWallet,
  IWallets
} from "@/interfaces/store/modules/profile.interface.ts";
import WithdrawalFundsModal from "@/components/Modals/Contents/WithdrawalFundsModal/WithdrawalFundsModal.vue";
import WalletReplenishmentModal
  from "@/components/Modals/Contents/WalletReplenishmentModal/WalletReplenishmentModal.vue";

const store = useStore();

const selectedWallet: Ref<IWallet | null> = ref(null);
const showWalletReplenishmentModal = ref(false);
const showWithdrawalFundsModal = ref(false);

const wallets: ComputedRef<IWallets> = computed(() => store.state.profile.profile.wallets);

const withdraw = (wallet: IWallet) => {
  selectedWallet.value = wallet
  showWithdrawalFundsModal.value = true
}

const replenish = (wallet: IWallet) => {
  selectedWallet.value = wallet
  showWalletReplenishmentModal.value = true
}
</script>

<style scoped lang="scss">
@import "p2pWallets";
</style>