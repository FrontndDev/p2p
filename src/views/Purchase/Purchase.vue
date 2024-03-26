<template>
  <div class="purchase">
    <div class="my-container">
      <Tabs
          type="default-tabs"
          :tabs="tabs"
      />
    </div>

    <PurchaseTable/>
    <Pagination/>
  </div>
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import { reactive } from "vue";
import PurchaseTable from "@/components/Tables/PurchaseTable/PurchaseTable.vue";
import Pagination from "@/components/Pagination/Pagination.vue";

const tabs = reactive([
  {
    id: 1,
    name: 'Объявления',
  },
  {
    id: 2,
    name: 'Мои покупки',
  }
]);
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.purchase {
  @include flexbox(column);
  width: 100%;
  border-radius: 16px;
  background: $bg-base;
}
</style>