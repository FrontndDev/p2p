<template>
  <div class="buy-currency">
    <Deal/>
<!--    <Chat/>-->
  </div>
</template>

<script setup lang="ts">
import Deal from "@/views/BuyCurrency/Deal/Deal.vue";
import {
  onMounted
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
// import Chat from "@/components/Chat/Chat.vue";

const store = useStore();
const route = useRoute();

onMounted(() => {
  store.dispatch('transactions/getTransactionInfo', route.params.transactionId )
})
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