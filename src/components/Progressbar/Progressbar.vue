<template>
  <div class="my-progressbar">
    <div class="my-progressbar__step" v-for="(step, idx) in steps" :key="step.id">
      <div class="my-progressbar__step-progress">
        <div class="my-progressbar__step-circle" :class="step?.type ?? ''">
          <template v-if="typeof getIcon(step) === 'number'">{{ getIcon(step) }}</template>
          <component :is="getIcon(step)" v-else/>
        </div>
        <div
            class="my-progressbar__step-line"
            :class="steps[idx + 1]?.type ? step?.type : ''"
            v-if="idx !== 2"
        />
      </div>
      <div class="my-progressbar__step-name">{{ step.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import CheckMarkIcon from '@/assets/svg/deal/check-mark.svg?component';
// @ts-ignore
import CrossIcon from '@/assets/svg/deal/cross.svg?component';

import {
  computed,
  PropType,
} from "vue";
import { TDealType } from "@/views/BuyCurrency/Deal/deal.interface.ts";
import { DealEnum } from "@/views/BuyCurrency/Deal/deal.enum.ts";

const props = defineProps({
  status: {
    type: String as PropType<TDealType>,
    required: true,
  }
})

const steps = computed(() => {
  let steps: { name: string; type?: string; }[] = [];

  switch (props.status) {
    case DealEnum.accepted:
      steps = [
        {
          name: 'Оплата сделки покупателем',
          type: 'active',
        },
        {
          name: 'Подтверждение оплаты продавцом',
        },
        {
          name: 'Завершено',
        }
      ]
      break;
    case DealEnum.payed:
      steps = [
        {
          name: 'Оплата сделки покупателем',
          type: 'completed',
        },
        {
          name: 'Подтверждение оплаты продавцом',
          type: 'active',
        },
        {
          name: 'Завершено',
        }
      ]
      break;
    case DealEnum.expired:
    case DealEnum.declined:
    case DealEnum.payment_confirmation_expired:
      steps = [
        {
          name: 'Оплата сделки покупателем',
          type: 'active',
        },
        {
          name: 'Подтверждение оплаты продавцом',
          type: 'canceled',
        },
        {
          name: 'Завершено',
        }
      ];
      break;
  }

  return steps.map((step, idx) => ({ id: idx + 1, ...step }))
})

const getIcon = (step: any) => {
  const index = steps.value.map(step => step.id).indexOf(step.id)

  if (steps.value[index + 1]?.type === 'canceled') {
    return CheckMarkIcon
  } else {
    switch (step.type) {
      case 'completed':
        return CheckMarkIcon;
      case 'canceled':
        return CrossIcon;
      default:
        return step.id
    }
  }
}
</script>

<style scoped lang="scss">
@import "progressbar";
</style>