<template>
  <div class="buy-currency">
    <Deal :expired-in="expiredIn"/>
<!--    <Chat/>-->
  </div>
</template>

<script setup lang="ts">
import Deal from "@/views/BuyCurrency/Deal/Deal.vue";
import {
  computed,
  onMounted,
  Ref,
  ref,
  watch
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { DealEnum } from "@/views/BuyCurrency/Deal/deal.enum.ts";
// import Chat from "@/components/Chat/Chat.vue";

const store = useStore();
const route = useRoute();

const expiredIn = ref(0);
const transactionInfo = computed(() => store.state.transactions.transactionInfo);
const dealType: Ref<DealEnum> = computed(() => transactionInfo.value.status?.name);

watch(() => expiredIn.value, () => {
  if (!expiredIn.value) {
    store.commit('transactions/CLEAR_SECOND_INTERVAL')
    store.dispatch('transactions/getTransactionInfo', route.params.transactionId);
  }
});

onMounted(async () => {
  await store.dispatch('transactions/getTransactionInfo', route.params.transactionId);
  expiredIn.value = store.state.transactions.transactionInfo.status.expiredIn;
  store.commit('transactions/SET_SECOND_INTERVAL', setInterval(() => {
    if (expiredIn.value) expiredIn.value--
  }, 1000))

  const exceptions = [DealEnum.completed, DealEnum.cancelled, DealEnum.expired, DealEnum.declined, DealEnum.payment_confirmation_expired]

  if (!exceptions.includes(dealType.value)) {
    store.commit('transactions/SET_INTERVAL', setInterval(async () => {
      if (route.params.transactionId) {
        await store.dispatch('transactions/getTransactionInfo', route.params.transactionId)
      }
    }, 10000));
  }
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixins";

.buy-currency {
  @include flexbox(row);
  column-gap: 16px;
}

@media screen and (max-width: 756px) {
  .buy-currency {
    & .chat {
      display: none;
    }
  }
}
</style>