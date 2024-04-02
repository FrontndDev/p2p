<template>
  <div class="my-checkbox" :class="{ active }" @click="setValue">
    <div class="my-checkbox__check-mark" :class="{ disabled }">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="props.active">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.36858 1.00419C9.55518 0.800627 9.54143 0.484343 9.33787 0.297747C9.13431 0.11115 8.81802 0.124902 8.63143 0.328461L3.5 5.92638L1.36858 3.60119C1.18198 3.39763 0.8657 3.38388 0.662141 3.57047C0.458581 3.75707 0.44483 4.07335 0.631426 4.27691L3.13143 7.00419C3.22613 7.1075 3.35985 7.16632 3.5 7.16632C3.64016 7.16632 3.77387 7.1075 3.86858 7.00419L9.36858 1.00419Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.36858 1.00419C9.55518 0.800627 9.54143 0.484343 9.33787 0.297747C9.13431 0.11115 8.81802 0.124902 8.63143 0.328461L3.5 5.92638L1.36858 3.60119C1.18198 3.39763 0.8657 3.38388 0.662141 3.57047C0.458581 3.75707 0.44483 4.07335 0.631426 4.27691L3.13143 7.00419C3.22613 7.1075 3.35985 7.16632 3.5 7.16632C3.64016 7.16632 3.77387 7.1075 3.86858 7.00419L9.36858 1.00419Z" fill="white"/>
      </svg>
    </div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['set-value']);

const setValue = () => {
  if (!props.disabled) emit('set-value')
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.my-checkbox {
  @include flexbox(row, flex-start, flex-start);
  column-gap: 16px;
  cursor: pointer;
  transition: .25s all ease;

  &.disabled {
    cursor: not-allowed;
  }

  &__check-mark {
    @include flex-center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  &:not(.active) .my-checkbox__check-mark {
    border: 1px solid $border-base-bright;

    &:hover {
      border-color: $border-primary-hover;
    }

    &:active {
      border-color: $border-primary-pressed;
    }

    &.disabled {
      border-color: $border-tertiary-disable !important;
      background: $bg-base-light !important;
    }
  }

  &.active .my-checkbox__check-mark {
    background: $bg-primary-default;
    border: none;

    &:hover {
      background: $bg-primary-hover;
    }

    &:active {
      background: $bg-primary-pressed;
    }

    &.disabled {
      background: $bg-tertiary-disable !important;
    }
  }
}
</style>