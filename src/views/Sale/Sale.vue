<template>
  <div class="sale">
    <Tabs
        type="default-tabs"
        :tabs="tabs"
    />
    <SaleTable/>
  </div>
</template>

<script setup lang="ts">
import SaleTable from "@/components/Tables/SaleTable/SaleTable.vue";
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import { reactive } from "vue";

const tabs = reactive([
  {
    id: 1,
    name: 'Объявления',
  },
  {
    id: 2,
    name: 'Мои сделки',
  }
]);
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.sale {
  @include flexbox(column);
  padding: 16px 24px;
  width: 100%;
  border-radius: 16px;
  background: $bg-base;
}
</style>