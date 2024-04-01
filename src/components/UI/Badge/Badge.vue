<template>
  <div class="badge" :class="props.type">{{ props.name }}</div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: 'Текст'
  },
  type: {
    type: String as PropType<'red'>,
    default: 'red',
  }
})
</script>

<style scoped lang="scss">
@import "badge";
</style>