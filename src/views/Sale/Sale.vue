<template>
  <div class="sale-info">
    <P2PWallets/>
    <TelegramBanner/>
    <InformationAboutTransfers/>
  </div>
  <Requisites @add-requisites="openMessageBox(() => showAddRequisitesModal = true)"/>

  <div class="sale">
    <div class="sale-tabs my-container">
      <div>
        <Tabs
            type="default-tabs"
            :default-tab="activeTab"
            :tabs="tabs"
            @set-tab="setTab"
        />

        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="$router.push({ name: 'profile-settings' })"
        >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 9C10.3431 9 8.99991 10.3431 8.99991 12C8.99991 13.6569 10.3431 15 11.9999 15C13.6568 15 14.9999 13.6569 14.9999 12C14.9999 10.3431 13.6568 9 11.9999 9ZM10.1999 12C10.1999 11.0059 11.0058 10.2 11.9999 10.2C12.994 10.2 13.7999 11.0059 13.7999 12C13.7999 12.9941 12.994 13.8 11.9999 13.8C11.0058 13.8 10.1999 12.9941 10.1999 12Z" fill="#576175"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9354 4.0284C10.3493 3.05376 9.07313 2.69721 8.0706 3.2838L6.5184 4.16256C5.40999 4.78939 5.0294 6.20183 5.66662 7.29293C6.01093 7.8806 5.96632 8.27275 5.84576 8.47973C5.72376 8.68918 5.39811 8.92593 4.70905 8.92593C3.43718 8.92593 2.3999 9.95588 2.3999 11.2168V12.7831C2.3999 14.044 3.43718 15.074 4.70905 15.074C5.39811 15.074 5.72376 15.3107 5.84576 15.5202C5.96633 15.7271 6.01051 16.12 5.6662 16.7077C5.02898 17.7988 5.41032 19.2107 6.51872 19.8375L8.0706 20.7161C9.07313 21.3027 10.3493 20.9462 10.9354 19.9715L11.038 19.7962C11.3818 19.2095 11.7521 19.0453 12.0033 19.0453C12.2536 19.0453 12.6212 19.2084 12.9605 19.794L12.9618 19.7962L13.0607 19.9653L13.0644 19.9715C13.6505 20.9461 14.9267 21.3027 15.9292 20.7161L17.4814 19.8373C18.5905 19.2101 18.9693 17.8083 18.3351 16.7102L18.3332 16.707C17.9889 16.1193 18.0335 15.7271 18.154 15.5202C18.276 15.3107 18.6017 15.074 19.2908 15.074C20.5626 15.074 21.5999 14.044 21.5999 12.7831V11.2168C21.5999 9.9429 20.5495 8.92593 19.2908 8.92593C18.6017 8.92593 18.276 8.68918 18.154 8.47973C18.0335 8.27275 17.9893 7.87989 18.3336 7.29221C18.9708 6.20111 18.5895 4.78921 17.4811 4.16238L15.9292 3.28381C14.9267 2.6972 13.6505 3.05374 13.0644 4.02838L12.962 4.2034C12.6181 4.79038 12.2478 4.9546 11.9965 4.9546C11.7462 4.9546 11.3786 4.79145 11.0393 4.20589L11.038 4.20366L10.9391 4.03455L10.9354 4.0284ZM8.67456 4.32074C9.09173 4.0752 9.64613 4.21631 9.90537 4.64412L10.001 4.80752L10.0017 4.8087C10.472 5.61967 11.1745 6.1546 11.9965 6.1546C12.818 6.1546 13.5228 5.61996 13.9975 4.80975L14.0944 4.64416C14.3536 4.21632 14.908 4.07527 15.3252 4.32081L16.8905 5.20701C17.4189 5.50572 17.5955 6.17602 17.2976 6.68665C16.8235 7.49607 16.7025 8.37194 17.1171 9.08372C17.5304 9.79313 18.3516 10.1259 19.2908 10.1259C19.9031 10.1259 20.3999 10.6219 20.3999 11.2168V12.7831C20.3999 13.3732 19.9079 13.874 19.2908 13.874C18.3516 13.874 17.5304 14.2068 17.1171 14.9162C16.7028 15.6275 16.8233 16.5028 17.2967 17.3118C17.5968 17.833 17.4175 18.495 16.8902 18.7931L15.3339 19.674L15.3252 19.6792C14.9081 19.9247 14.3537 19.7836 14.0944 19.3558L13.9988 19.1924L13.9982 19.1913C13.5279 18.3803 12.8253 17.8453 12.0033 17.8453C11.1818 17.8453 10.477 18.3799 10.0023 19.1901L9.90538 19.3558C9.64613 19.7836 9.09177 19.9246 8.6746 19.6791L7.10927 18.7929C6.58088 18.4942 6.40427 17.8239 6.70219 17.3133C7.17631 16.5038 7.29729 15.628 6.88268 14.9162C6.46945 14.2068 5.64818 13.874 4.70905 13.874C4.09186 13.874 3.5999 13.3732 3.5999 12.7831V11.2168C3.5999 10.6267 4.09186 10.1259 4.70905 10.1259C5.64818 10.1259 6.46945 9.79313 6.88268 9.08372C7.29735 8.37184 7.1767 7.49655 6.70242 6.68703C6.40417 6.17635 6.58106 5.50561 7.10959 5.20682L8.66586 4.32586L8.67456 4.32074Z" fill="#576175"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 9C10.3431 9 8.99991 10.3431 8.99991 12C8.99991 13.6569 10.3431 15 11.9999 15C13.6568 15 14.9999 13.6569 14.9999 12C14.9999 10.3431 13.6568 9 11.9999 9ZM10.1999 12C10.1999 11.0059 11.0058 10.2 11.9999 10.2C12.994 10.2 13.7999 11.0059 13.7999 12C13.7999 12.9941 12.994 13.8 11.9999 13.8C11.0058 13.8 10.1999 12.9941 10.1999 12Z" fill="#576175"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9354 4.0284C10.3493 3.05376 9.07313 2.69721 8.0706 3.2838L6.5184 4.16256C5.40999 4.78939 5.0294 6.20183 5.66662 7.29293C6.01093 7.8806 5.96632 8.27275 5.84576 8.47973C5.72376 8.68918 5.39811 8.92593 4.70905 8.92593C3.43718 8.92593 2.3999 9.95588 2.3999 11.2168V12.7831C2.3999 14.044 3.43718 15.074 4.70905 15.074C5.39811 15.074 5.72376 15.3107 5.84576 15.5202C5.96633 15.7271 6.01051 16.12 5.6662 16.7077C5.02898 17.7988 5.41032 19.2107 6.51872 19.8375L8.0706 20.7161C9.07313 21.3027 10.3493 20.9462 10.9354 19.9715L11.038 19.7962C11.3818 19.2095 11.7521 19.0453 12.0033 19.0453C12.2536 19.0453 12.6212 19.2084 12.9605 19.794L12.9618 19.7962L13.0607 19.9653L13.0644 19.9715C13.6505 20.9461 14.9267 21.3027 15.9292 20.7161L17.4814 19.8373C18.5905 19.2101 18.9693 17.8083 18.3351 16.7102L18.3332 16.707C17.9889 16.1193 18.0335 15.7271 18.154 15.5202C18.276 15.3107 18.6017 15.074 19.2908 15.074C20.5626 15.074 21.5999 14.044 21.5999 12.7831V11.2168C21.5999 9.9429 20.5495 8.92593 19.2908 8.92593C18.6017 8.92593 18.276 8.68918 18.154 8.47973C18.0335 8.27275 17.9893 7.87989 18.3336 7.29221C18.9708 6.20111 18.5895 4.78921 17.4811 4.16238L15.9292 3.28381C14.9267 2.6972 13.6505 3.05374 13.0644 4.02838L12.962 4.2034C12.6181 4.79038 12.2478 4.9546 11.9965 4.9546C11.7462 4.9546 11.3786 4.79145 11.0393 4.20589L11.038 4.20366L10.9391 4.03455L10.9354 4.0284ZM8.67456 4.32074C9.09173 4.0752 9.64613 4.21631 9.90537 4.64412L10.001 4.80752L10.0017 4.8087C10.472 5.61967 11.1745 6.1546 11.9965 6.1546C12.818 6.1546 13.5228 5.61996 13.9975 4.80975L14.0944 4.64416C14.3536 4.21632 14.908 4.07527 15.3252 4.32081L16.8905 5.20701C17.4189 5.50572 17.5955 6.17602 17.2976 6.68665C16.8235 7.49607 16.7025 8.37194 17.1171 9.08372C17.5304 9.79313 18.3516 10.1259 19.2908 10.1259C19.9031 10.1259 20.3999 10.6219 20.3999 11.2168V12.7831C20.3999 13.3732 19.9079 13.874 19.2908 13.874C18.3516 13.874 17.5304 14.2068 17.1171 14.9162C16.7028 15.6275 16.8233 16.5028 17.2967 17.3118C17.5968 17.833 17.4175 18.495 16.8902 18.7931L15.3339 19.674L15.3252 19.6792C14.9081 19.9247 14.3537 19.7836 14.0944 19.3558L13.9988 19.1924L13.9982 19.1913C13.5279 18.3803 12.8253 17.8453 12.0033 17.8453C11.1818 17.8453 10.477 18.3799 10.0023 19.1901L9.90538 19.3558C9.64613 19.7836 9.09177 19.9246 8.6746 19.6791L7.10927 18.7929C6.58088 18.4942 6.40427 17.8239 6.70219 17.3133C7.17631 16.5038 7.29729 15.628 6.88268 14.9162C6.46945 14.2068 5.64818 13.874 4.70905 13.874C4.09186 13.874 3.5999 13.3732 3.5999 12.7831V11.2168C3.5999 10.6267 4.09186 10.1259 4.70905 10.1259C5.64818 10.1259 6.46945 9.79313 6.88268 9.08372C7.29735 8.37184 7.1767 7.49655 6.70242 6.68703C6.40417 6.17635 6.58106 5.50561 7.10959 5.20682L8.66586 4.32586L8.67456 4.32074Z" fill="#576175"/>
        </svg>
      </div>

      <div class="sale-tabs-button">
        <MyButton width="100%" size="big" name="Добавить объявление" @click="openMessageBox(() => router.push({ name: 'place-ad' }))">
          <template #icon-right>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.5C8.27614 1.5 8.5 1.72386 8.5 2V14C8.5 14.2761 8.27614 14.5 8 14.5C7.72386 14.5 7.5 14.2761 7.5 14V2C7.5 1.72386 7.72386 1.5 8 1.5Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 8.27614 14.2761 8.5 14 8.5L2 8.5C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5L14 7.5C14.2761 7.5 14.5 7.72386 14.5 8Z" fill="white"/>
            </svg>
          </template>
        </MyButton>
      </div>
    </div>

    <SaleAnnouncement v-if="activeTab.id === 1"/>
    <MyPurchasesAndDeals
        type="deals"
        v-else-if="activeTab.id === 2"
        @more-details="goToDeal"
    />
  </div>

  <AddRequisitesModal v-if="showAddRequisitesModal" @close-modal="showAddRequisitesModal = false"/>
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import {
  computed,
  onBeforeMount,
  reactive,
  ref,
  Ref
} from "vue";
import SaleAnnouncement from "@/components/Tables/SaleAnnouncement/SaleAnnouncement.vue";
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";
import MyPurchasesAndDeals from "@/components/Tables/MyPurchasesAndDeals/MyPurchasesAndDeals.vue";
import P2PWallets from "@/components/P2PWallets/P2PWallets.vue";
import Requisites from "@/components/Requisites/Requisites.vue";
import TelegramBanner from "@/components/TelegramBanner/TelegramBanner.vue";
import InformationAboutTransfers from "@/components/InformationAboutTransfers/InformationAboutTransfers.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import AddRequisitesModal from "@/components/Modals/Contents/AddRequisitesModal/AddRequisitesModal.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useMessageBox } from "@/composables/useMessageBox.ts";

const store = useStore();
const router = useRouter();

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

const showAddRequisitesModal = ref(false);

const activeTab: Ref<ITabs> = computed(() => store.state.saleActiveTab);
const profile = computed(() => store.state.profile);

const telegramActive = computed(() => profile.value.profile.telegramActive);

const windowWidth = ref(0);

const setTab = (tab: ITabs) => {
  store.commit('SET_SALE_ACTIVE_TAB', tab)
}

const setWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

const openMessageBox = (callback: Function) => {
  !telegramActive.value ? useMessageBox('Для добавления реквизитов необходимо подключение к Telegram Bot').then(() => {
    window.open('/app/profile/edit#tab-telegram.', '_self')
  }) : callback()
}

const goToDeal = (transactionId: number) => {
  router.push({ name: 'deal', params: { transactionId } })
}

onBeforeMount(() => {
  if (!activeTab.value?.id) store.commit('SET_SALE_ACTIVE_TAB', tabs[0]);

  setWindowWidth();

  window.onresize = () => {
    setWindowWidth();
  }
});
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
    grid-area: sale-info;
    row-gap: 16px;
  }

  &-tabs {
    @include flexbox(row, space-between, center);
    width: 100%;

    & > div:first-child > svg {
      display: none;
    }
  }
}

@media screen and (max-width: 756px) {
  .sale {
    &-info {
      display: none;
    }

    &-tabs {
      @include flexbox(column);
      row-gap: 16px;

      & > div {
        width: 100%;

        &:first-child {
          @include flexbox(row, space-between, center);
          column-gap: 16px;
        }
      }

      & > div:first-child > svg {
        display: block;
      }
    }
  }

  .requisites {
    display: none;
  }
}
</style>