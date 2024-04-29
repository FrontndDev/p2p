<template>
  <div class="purchase">
    <div class="purchase__tabs my-container">
      <Tabs
          type="default-tabs"
          :tabs="tabs"
          @set-tab="setTab"
      />

      <Settings @click="openModal(ModalsEnum.showPurchaseFilter)"/>
    </div>

    <PurchaseAnnouncement @buy="openDeal" v-if="activeTab.id === 1"/>
    <MyPurchasesAndDeals v-else-if="activeTab.id === 2"/>
  </div>

  <PurchaseFilter @close-popup="closeModal(ModalsEnum.showPurchaseFilter)" v-if="showModals.showPurchaseFilter"/>
  <DealModal
      :deal-id="selectedDeal"
      @close-modal="closeModal(ModalsEnum.showDealModal)"
      v-if="showModals.showDealModal"
  />
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import {
  reactive,
  Ref,
  ref,
} from "vue";
import PurchaseAnnouncement from "@/components/Tables/PurchaseAnnouncement/PurchaseAnnouncement.vue";
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";
import MyPurchasesAndDeals from "@/components/Tables/MyPurchasesAndDeals/MyPurchasesAndDeals.vue";
import DealModal from "@/components/Modals/Contents/DealModal/DealModal.vue";
import PurchaseFilter from "@/components/BottomPopups/PurchaseFilter/PurchaseFilter.vue";
// @ts-ignore
import Settings from '@/assets/svg/settings.svg?component';
import { ModalsEnum } from "@/enums/modals.enum.ts";
import { IShowModals } from "@/components/Modals/modal.interface.ts";
import {
  useRouter
} from "vue-router";

const router = useRouter();

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

const activeTab: Ref<ITabs> = ref(tabs[0]);

const selectedDeal = ref(-1)

// Show Modals
const showModals: IShowModals = reactive({
  showDealModal: false,
  showPurchaseFilter: false,
});

const setTab = (tab: ITabs) => {
  activeTab.value = tab
}

const openModal = (key: ModalsEnum) => {
  showModals[key] = true
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const closeModal = (key: ModalsEnum) => {
  router.push({ query: {} })
  showModals[key] = false
  document.body.style.overflow = 'auto'
  document.documentElement.style.overflow = 'auto'
}

const openDeal = (id: number) => {
  selectedDeal.value = id
  openModal(ModalsEnum.showDealModal)
}
</script>

<style scoped lang="scss">
@import "purchase";
</style>