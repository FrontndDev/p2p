<template>
  <div class="ad-information">
    <div class="ad-information__title title-h2 fw-700">Размещаемое объявление</div>

    <div class="ad-information__body">
      <div class="ad-information__content">
        <div class="ad-information__content-header">
          <div class="ad-information__content-title">Продажа</div>
          <div class="ad-information__content-wallet">
            <img src="@/assets/images/ton.png" alt="icon">
            {{ props.selectedInnerCurrency?.name }}
          </div>
        </div>

        <div class="ad-information__rows">
          <div class="ad-information__row">
            <div>Цена</div>
            <div class="fw-700">{{ props.sellingPrice ?? 0 }} {{ selectedOuterCurrency?.name }}</div>
          </div>
          <div class="ad-information__row">
            <div>Общее колличество</div>
            <div>{{ props.amountOfCurrency ?? 0 }} {{ props.selectedInnerCurrency?.name }}</div>
          </div>
          <div class="ad-information__row">
            <div>Лимиты</div>
            <div>{{ props.minAmount ?? 0}}Р - {{ props.maxAmount ?? 0 }}Р</div>
          </div>
          <div class="ad-information__row">
            <div>Способ оплаты</div>
            <PaymentMethods :payment-methods="[props.selectedPaymentMethod]" v-if="props.selectedPaymentMethod"/>
            <div v-else>-</div>
          </div>
        </div>

        <div class="ad-information__footer">
          <template v-if="route.name === 'place-ad'">
            <div class="ad-information__conditions">
              <MyCheckbox :active="conditions" @set-value="conditions = !conditions">
                <div class="ad-information__checkbox-text">
                  Я прочитал(-а) и соглашаюсь с <a href="#">Условиями</a> и <a href="#">Политикой конфидентиальности P2P</a>
                </div>
              </MyCheckbox>
            </div>
            <MyButton size="big" width="100%" name="Разместить объявление" @click="emit('create-ad')"/>
          </template>
          <div class="ad-information__buttons" v-else-if="route.name === 'edit-ad'">
            <MyButton type="neutral-btn" size="big" width="100%" name="Удалить">
              <template #icon-left>
                <TrashIcon/>
              </template>
            </MyButton>
            <MyButton size="big" width="100%" name="Остановить">
              <template #icon-left>
                <PauseIcon/>
              </template>
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import TrashIcon from '@/assets/svg/trash.svg?component';
// @ts-ignore
import PauseIcon from '@/assets/svg/pause.svg?component';
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import {
  PropType,
  ref
} from "vue";
import MyCheckbox from "@/components/UI/MyCheckbox/MyCheckbox.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import { useRoute } from "vue-router";
import { ISelect } from "@/components/UI/Select/select.interface.ts";

const props = defineProps({
  selectedInnerCurrency: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  selectedOuterCurrency: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  sellingPrice: {
    type: Number,
  },
  amountOfCurrency: {
    type: Number,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  selectedPaymentMethod: {
    type: Object as PropType<ISelect | null>,
    required: true,
  }
})

const emit = defineEmits(['create-ad'])

const route = useRoute();

const conditions = ref(false);
</script>

<style scoped lang="scss">
@import "adInformation";
</style>