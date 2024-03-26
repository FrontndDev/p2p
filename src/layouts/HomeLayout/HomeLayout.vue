<template>
  <div class="home-layout">
    <MyHeader :tabs="tabs" @set-tab="setTab"/>

    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import MyHeader from "@/components/MyHeader/MyHeader.vue";
import {
  onMounted,
  reactive,
  ref,
  Ref
} from "vue";
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";
import {
  useRoute,
  useRouter
} from "vue-router";
import { IHomeRoutes } from "@/layouts/HomeLayout/home-layout.interface.ts";
import { HomeRoutesEnum } from "@/enums/home-routes.enum.ts";

const route = useRoute();
const router = useRouter();

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

const routes: IHomeRoutes = reactive({
  1: HomeRoutesEnum.purchase,
  2: HomeRoutesEnum.sale,
})

const selectedType: Ref<ITabs> = ref(tabs[0]);

const setTab = (tab: ITabs) => {
  selectedType.value = tab
  router.push({ name: routes[tab.id] })
}

onMounted(() => {
  console.log('route', route)
  if (!route.name) {
    router.push({ name: HomeRoutesEnum.purchase })
  }
})
</script>

<style scoped lang="scss">
@import "homeLayout";
</style>