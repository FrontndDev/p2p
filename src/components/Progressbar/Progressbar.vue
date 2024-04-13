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

import { reactive } from "vue";

const steps = reactive([
  {
    id: 1,
    name: 'Оплата сделки покупателем',
    type: 'completed',
  },
  {
    id: 2,
    name: 'Подтверждение оплаты продавцом',
    type: 'active',
  },
  {
    id: 3,
    name: 'Завершено',
  }
]);

const getIcon = (step: any) => {
  const index = steps.map(step => step.id).indexOf(step.id)

  if (steps[index + 1]?.type === 'canceled') {
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