<template>
  <div class="sale">
    <div class="my-container">
      <Tabs
          type="default-tabs"
          :tabs="tabs"
          @set-tab="setTab"
      />
    </div>

    <SaleAnnouncement v-if="activeTab.id === 1"/>
    <MyPurchasesAndDeals v-else-if="activeTab.id === 2"/>

    <Pagination/>
  </div>
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import {
  reactive,
  ref,
  Ref
} from "vue";
import SaleAnnouncement from "@/components/Tables/SaleAnnouncement/SaleAnnouncement.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";
import MyPurchasesAndDeals from "@/components/Tables/MyPurchasesAndDeals/MyPurchasesAndDeals.vue";

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

const activeTab: Ref<ITabs> = ref(tabs[0])

const setTab = (tab: ITabs) => {
  activeTab.value = tab
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.sale {
  @include flexbox(column);
  width: 100%;
  border-radius: 16px;
  background: $bg-base;
}
</style>