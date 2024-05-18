<template>
  <div class="payment-methods">
    <div
        class="payment-methods__item"
        :title="method.name"
        v-for="method in props.paymentMethods"
        :key="method.id"
        :class="props.bg"
    >{{ method.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";

const props = defineProps({
  paymentMethods: {
    type: Array as PropType<ISelect[]>,
    required: true,
  },
  bg: {
    type: String as PropType<'base-secondary' | 'base-light'>,
    default: 'base-secondary'
  }
})
</script>

<style scoped lang="scss">
@import "paymentMethods";
</style>