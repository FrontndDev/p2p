<template>
  <div class="ad">
    <div class="ad__header">
      <div class="ad__header-left">
        <div class="title-h2 fw-700">Объявление</div>
        <Badge name="Продажа"/>
      </div>
      <AdditionalInfo date="28.02.2024" time="18:01" id="12357413255"/>
    </div>

    <div class="ad__content">
      <div class="ad__row">
        <div class="ad__row-title">Тип</div>
        <div class="ad__row-content">
          <div class="ad__row-select">
            <Select title="Продаю" :items="wallets" :selected-item="selectedWallet"/>
            <span>Всего доступно <span>1 000 000 TON</span></span>
          </div>
          <Select title="За валюту" :items="wallets" :selected-item="selectedWallet"/>
        </div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Настройка цены</div>
        <div class="ad__row-content">
          <Select title="По цене" :items="wallets" :selected-item="selectedWallet"/>
        </div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Параметры сделки</div>
        <div class="ad__row-content">
          <div class="ad__row-input">
            <MyInput
                class="my-input-second"
                placeholder="Доступно 1 000 000"
                title="Количество на продажу"
                wallet="TON"
                :icon="TONIcon"
            />

            <div class="ad__row-input-info">
              <div>
                <span>Для продажи</span>
                <span>999 999 TON</span>
              </div>
              <div>
                <span>Комиссия</span>
                <span>1 000 TON</span>
                <InfoIcon/>
              </div>
            </div>
          </div>

          <Select title="По цене" :items="wallets" :selected-item="selectedWallet"/>
          <Select title="По цене" :items="wallets" :selected-item="selectedWallet"/>
        </div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Способ оплаты</div>
        <div class="ad__row-content"></div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Комментарий</div>
        <div class="ad__row-content"></div>
      </div>
      <div class="ad__row">
        <div class="ad__row-title">Telegram Bot</div>
        <div class="ad__row-content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TONIcon from '@/assets/svg/wallets/ton.svg';
import InfoIcon from '@/assets/svg/info.svg?component';
import Badge from "@/components/UI/Badge/Badge.vue";
import AdditionalInfo from "@/components/UI/AdditionalInfo/AdditionalInfo.vue";
import Select from "@/components/UI/Select/Select.vue";
import {
  onMounted,
  reactive,
  Ref,
  ref
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import MyInput from "@/components/UI/MyInput/MyInput.vue";


const wallets: ISelect[] = reactive([
  {
    id: 1,
    name: 'TON',
  }
]);

const selectedWallet: Ref<ISelect | null> = ref(null);

onMounted(() => {
  selectedWallet.value = wallets[0]
})
</script>

<style scoped lang="scss">
@import "ad";
</style>