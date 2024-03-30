<template>
    <div class="my-input">
      <div class="my-input__title" v-if="props.title">{{ props.title }}</div>
      <input
          type="text"
          :style="`width: calc(100% - ${wallet ? wallet?.offsetWidth + 16 : 0}px);`"
          :placeholder="props.placeholder"
          :value="props.value"
          @input="inputValue($event)"
      >

      <div class="my-input__wallet" ref="wallet" v-if="props.wallet">
        <span>{{ props.wallet }}</span>|<span>Все</span>
      </div>
    </div>
</template>

<script setup lang="ts">
import {
  Ref,
  ref
} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  wallet: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['inputValue']);

const wallet: Ref<HTMLDivElement | undefined> = ref();

const inputValue = (e: Event) => {
  const event = e.target as HTMLInputElement
  emit('inputValue', event.value)
}
</script>

<style scoped lang="scss">
@import "myInput";
</style>