<template>
  <div
      class="my-button"
      :style="`width: ${props.width};`"
      :class="[props.type, props.size, { disabled }]"
  >
    <slot name="icon-left"/>
    {{ props.name }}
    <slot name="icon-right"/>

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
  size: {
    type: String as PropType<'' | 'big'>,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: 'Name'
  },
  legend: {
    type: Number || String,
    default: ''
  },
  width: {
    type: String,
    default: 'fit-content'
  }
})
</script>

<style scoped lang="scss">
@import "myButton";
</style>