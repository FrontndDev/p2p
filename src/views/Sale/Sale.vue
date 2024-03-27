<template>
  <div class="sale-info">
    <P2PWallets/>
    <TelegramBanner/>
    <InformationAboutTransfers/>
  </div>
  <Requisites/>
  <div class="sale">
    <div class="sale-tabs my-container">
      <Tabs
          type="default-tabs"
          :tabs="tabs"
          @set-tab="setTab"
      />

      <MyButton size="big" name="Добавить объявление">
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.5C8.27614 1.5 8.5 1.72386 8.5 2V14C8.5 14.2761 8.27614 14.5 8 14.5C7.72386 14.5 7.5 14.2761 7.5 14V2C7.5 1.72386 7.72386 1.5 8 1.5Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 8.27614 14.2761 8.5 14 8.5L2 8.5C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5L14 7.5C14.2761 7.5 14.5 7.72386 14.5 8Z" fill="white"/>
          </svg>
        </template>
      </MyButton>
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
import MyButton from "@/components/UI/MyButton/MyButton.vue";

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

  &-tabs {
    @include flexbox(row, space-between, center);
    width: 100%;
  }
}
</style>