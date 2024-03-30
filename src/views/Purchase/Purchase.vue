<template>
  <div class="purchase">
    <div class="purchase__tabs my-container">
      <Tabs
          type="default-tabs"
          :tabs="tabs"
          @set-tab="setTab"
      />

      <Settings @click="showPurchaseFilter = !showPurchaseFilter"/>
    </div>

    <PurchaseAnnouncement v-if="activeTab.id === 1"/>
    <MyPurchasesAndDeals v-else-if="activeTab.id === 2"/>

    <Pagination/>
  </div>

  <PurchaseFilter @close-popup="showPurchaseFilter = false" v-if="showPurchaseFilter"/>
  <DealModal v-if="true"/>
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import {
  reactive,
  Ref,
  ref
} from "vue";
import PurchaseAnnouncement from "@/components/Tables/PurchaseAnnouncement/PurchaseAnnouncement.vue";
import Pagination from "@/components/UI/Pagination/Pagination.vue";
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";
import MyPurchasesAndDeals from "@/components/Tables/MyPurchasesAndDeals/MyPurchasesAndDeals.vue";
import DealModal from "@/components/Modals/DealModal/DealModal.vue";
import PurchaseFilter from "@/components/BottomPopups/PurchaseFilter/PurchaseFilter.vue";
import Settings from '@/assets/svg/settings.svg?component';

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

const showPurchaseFilter = ref(false);

const activeTab: Ref<ITabs> = ref(tabs[0])

const setTab = (tab: ITabs) => {
  activeTab.value = tab
}
</script>

<style scoped lang="scss">
@import "purchase";
</style>