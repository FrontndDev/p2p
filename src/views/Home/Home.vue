<template>
  <div class="home">
    <MyHeader :tabs="tabs" @set-tab="setTab"/>

    <template v-if="selectedType.id === 1">
      Покупка
    </template>
    <template v-else-if="selectedType.id === 2">
      Продажа
    </template>
  </div>
</template>

<script setup lang="ts">
import MyHeader from "@/components/MyHeader/MyHeader.vue";
import {
  reactive,
  Ref,
  ref
} from "vue";
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";

const tabs = reactive([
  {
    id: 1,
    name: 'Покупка',
  },
  {
    id: 2,
    name: 'Продажа',
  }
]);

const selectedType: Ref<ITabs> = ref(tabs[0]);

const setTab = (tab: ITabs) => {
  selectedType.value = tab
}
</script>

<style scoped lang="scss">

</style>