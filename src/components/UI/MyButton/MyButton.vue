<template>
  <div class="my-button" :class="props.type">
    {{ props.name }}

    <div class="my-button__legend" v-if="props.legend">{{ props.legend }}</div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<'primary-btn' | 'second-primary-btn' | 'success-btn' | 'second-success-btn' | 'neutral-btn'>,
    default: 'primary-btn'
  },
  name: {
    type: String,
    default: 'Name'
  },
  legend: {
    type: Number || String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
@import "myButton";
</style>