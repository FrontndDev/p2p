<template>
  <div class="purchase">
    <div class="my-container">
      <Tabs
          type="default-tabs"
          :tabs="tabs"
          @set-tab="setTab"
      />
    </div>

    <PurchaseAnnouncement v-if="activeTab.id === 1"/>
    <MyPurchasesAndDeals v-else-if="activeTab.id === 2"/>

    <Pagination/>
  </div>
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import {
  reactive,
  Ref,
  ref
} from "vue";
import PurchaseAnnouncement from "@/components/Tables/PurchaseAnnouncement/PurchaseAnnouncement.vue";
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
    name: 'Мои покупки',
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

.purchase {
  @include flexbox(column);
  width: 100%;
  border-radius: 16px;
  background: $bg-base;
}
</style>