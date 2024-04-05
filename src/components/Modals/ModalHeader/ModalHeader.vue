<template>
  <div class="my-modal-header">
    <div class="my-modal-header__back">Назад</div>
    <div class="my-modal-header__title" v-show="props.showTitle">{{ props.title }}</div>
    <ModalCloseIcon size="big" @click="emit('close-modal')"/>
  </div>
</template>

<script setup lang="ts">
import ModalCloseIcon from "@/components/Modals/ModalCloseIcon/ModalCloseIcon.vue";

const props = defineProps({
  showTitle: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['close-modal']);
</script>

<style scoped lang="scss">
@import "modalHeader";
</style>