<template>
  <div class="my-header">
    <div class="my-header__up">
      <div class="my-header__title title-h1">Social P2P</div>
      <Tabs
          type="header-tabs"
          :default-tab="getTabByRouteName"
          :tabs="props.tabs"
          @set-tab="setTab"
      />
    </div>

    <div class="my-header__selects" v-if="route.name === HomeRoutesEnum.purchase">
      <Select
          v-for="select in selects"
          :key="select.id"
          :id="select.id"
          :title="select.title"
          :items="select.items"
          :selected-item="select.selectedItem.value"
          @select="selectItem"
      />
      <MyInput
          title="Количество"
          placeholder="Введите сумму"
          :value="sum"
          @input-value="inputValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import Select from "@/components/UI/Select/Select.vue";
import {
  computed,
  ComputedRef,
  onMounted,
  PropType,
  reactive,
  Ref,
  ref
} from "vue";
import MyInput from "@/components/UI/MyInput/MyInput.vue";
import {
  ISelect,
  ISelects
} from "@/components/UI/Select/select.interface.ts";

import RUBIcon from '@/assets/images/rub.png';
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";
import { useRoute } from "vue-router";
import { HomeRoutesEnum } from "@/enums/home-routes.enum.ts";

const props = defineProps({
  tabs: {
    type: Object as PropType<ITabs[]>,
    required: true,
  }
})

const emit = defineEmits(['set-tab'])

const route = useRoute();

const getTabByRouteName = computed(() => {
  const routeName = route.name as HomeRoutesEnum

  switch (routeName) {
    case HomeRoutesEnum.purchase:
      return props.tabs[0]
    case HomeRoutesEnum.sale:
      return props.tabs[1]
  }
})

const purchase: ISelect[] = reactive([
  {
    id: 1,
    name: 'Все'
  },
  {
    id: 2,
    name: 'Не все'
  }
]);
const wallets: ISelect[] = reactive([
  {
    id: 1,
    icon: RUBIcon,
    name: 'RUB'
  },
  {
    id: 2,
    icon: RUBIcon,
    name: 'BUN'
  },
]);
const paymentMethods: ISelect[] = reactive([
  {
    id: 1,
    name: 'Все способы'
  },
  {
    id: 2,
    name: 'Не все способы'
  }
]);

const selectedPurchase: Ref<ISelect | null> = ref(null);
const selectedWallet: Ref<ISelect | null> = ref(null);
const selectedPaymentMethod: Ref<ISelect | null> = ref(null);
const sum = ref('');

const selects: ComputedRef<ISelects[]> = computed(() => [
  {
    id: 1,
    title: 'Покупаю',
    items: purchase,
    selectedItem: computed(() => selectedPurchase.value)
  },
  {
    id: 2,
    title: 'Отдаю',
    items: wallets,
    selectedItem: computed(() => selectedWallet.value)
  },
  {
    id: 3,
    title: 'Способ оплаты',
    items: paymentMethods,
    selectedItem: computed(() => selectedPaymentMethod.value)
  }
])

const selectItem = (item: ISelect, id: number) => {
  switch (id) {
    case 1:
      selectedPurchase.value = item;
      break;
    case 2:
      selectedWallet.value = item;
      break;
    case 3:
      selectedPaymentMethod.value = item;
      break;
  }
}

const inputValue = (value: string) => {
  sum.value = value
}

const setTab = (tab: ITabs) => {
  emit('set-tab', tab)
}

onMounted(() => {
  selectedPurchase.value = purchase[0]
  selectedWallet.value = wallets[0]
  selectedPaymentMethod.value = paymentMethods[0]
})
</script>

<style scoped lang="scss">
@import "myHeader";
</style>