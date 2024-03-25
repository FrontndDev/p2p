<template>
    <div class="my-input">
      <div class="my-input__title" v-if="props.title">{{ props.title }}</div>
      <input
          type="text"
          :placeholder="props.placeholder"
          :value="props.value"
          @input="inputValue($event)"
      >
    </div>
</template>

<script setup lang="ts">
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
  }
})

const emit = defineEmits(['inputValue'])

const inputValue = (e: Event) => {
  const event = e.target as HTMLInputElement
  emit('inputValue', event.value)
}
</script>

<style scoped lang="scss">
@import "myInput";
</style>