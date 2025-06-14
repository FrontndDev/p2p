<template>
  <div class="purchase">
    <div class="purchase__tabs my-container">
      <Tabs
          type="default-tabs"
          :default-tab="activeTab"
          :tabs="tabs"
          @set-tab="setTab"
      />

      <Settings @click="openModal(ModalsEnum.showPurchaseFilter)"/>
    </div>

    <PurchaseAnnouncement @buy="openDeal" v-if="activeTab.id === 1"/>
    <MyPurchasesAndDeals v-else-if="activeTab.id === 2" @more-details="goToDeal"/>
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
  computed,
  onBeforeMount,
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
import { useStore } from "vuex";

const store = useStore();
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

const activeTab: Ref<ITabs> = computed(() => store.state.purchaseActiveTab);

const selectedDeal = ref(-1)

// Show Modals
const showModals: IShowModals = reactive({
  showDealModal: false,
  showPurchaseFilter: false,
});

const setTab = (tab: ITabs) => {
  store.commit('SET_PURCHASE_ACTIVE_TAB', tab)
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

const goToDeal = (transactionId: number) => {
  router.push({ name: 'deal', params: { transactionId } })
}

onBeforeMount(() => {
  if (!activeTab.value?.id) store.commit('SET_PURCHASE_ACTIVE_TAB', tabs[0]);
})
</script>

<style scoped lang="scss">
@import "purchase";
</style>