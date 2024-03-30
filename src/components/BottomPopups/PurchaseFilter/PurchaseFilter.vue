<template>
  <BottomPopup title="Фильтр">
    <template #content>
      <div class="purchase-filter">
        <div class="purchase-filter__content">
          <Select
              class="no-media"
              v-for="select in selects"
              :key="select.id"
              :id="select.id"
              :title="select.title"
              :items="select.items"
              :selected-item="select.selectedItem.value"
              @select="selectItem"
          />
          <MyInput
              class="no-media"
              title="Количество"
              placeholder="Введите сумму"
              :value="sum"
              @input-value="inputValue"
          />
        </div>

        <MyButton width="100%" size="big" name="Сохранить"/>
      </div>
    </template>
  </BottomPopup>
</template>

<script setup lang="ts">
import BottomPopup from "@/components/BottomPopups/BottomPopup.vue";
import Select from "@/components/UI/Select/Select.vue";
import MyInput from "@/components/UI/MyInput/MyInput.vue";
import {
  computed,
  ComputedRef,
  onMounted,
  reactive,
  ref,
  Ref
} from "vue";
import {
  ISelect,
  ISelects
} from "@/components/UI/Select/select.interface.ts";
import RUBIcon from "@/assets/images/rub.png";
import MyButton from "@/components/UI/MyButton/MyButton.vue";

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
    name: 'Все'
  },
  {
    id: 2,
    name: 'Не все'
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

onMounted(() => {
  selectedPurchase.value = purchase[0]
  selectedWallet.value = wallets[0]
  selectedPaymentMethod.value = paymentMethods[0]
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixins";

.purchase-filter {
  @include flexbox(column);
  row-gap: 24px;
  width: 100%;

  &__content {
    @include flexbox(column);
    row-gap: 16px;
    width: 100%;
  }
}
</style>