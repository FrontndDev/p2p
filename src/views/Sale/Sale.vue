<template>
  <div class="sale-info">
    <P2PWallets/>
    <TelegramBanner/>
    <InformationAboutTransfers/>
  </div>
  <Requisites/>
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
import P2PWallets from "@/components/P2PWallets/P2PWallets.vue";
import Requisites from "@/components/Requisites/Requisites.vue";
import TelegramBanner from "@/components/TelegramBanner/TelegramBanner.vue";
import InformationAboutTransfers from "@/components/InformationAboutTransfers/InformationAboutTransfers.vue";

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
  grid-area: my-table;
  width: 100%;
  border-radius: 16px;
  background: $bg-base;

  &-info {
    @include flexbox(column);
    row-gap: 16px;
    grid-area: sale-info;
  }
}
</style>