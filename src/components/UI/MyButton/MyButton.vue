<template>
  <div
      class="my-button"
      :style="`width: ${props.width};`"
      :class="[props.type, props.size, { disabled }, { loading }, { 'button-error': props.error }]"
      @click="click"
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
  loading: {
    type: Boolean,
    default: false,
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
  },
  error: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['click']);

const click = () => {
  if (!props.disabled) emit('click')
}
</script>

<style scoped lang="scss">
@import "myButton";
</style>