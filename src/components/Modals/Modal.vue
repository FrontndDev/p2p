<template>
  <Teleport to="body">
    <Transition name="modal">
      <div class="my-modal">
        <div class="my-modal__content" :style="`padding: ${props.padding}; max-width: ${width};`">
          <ModalHeader :title="props.title" :show-title="props.showTitle"/>

          <slot name="content"/>

          <ModalCloseIcon size="little" @click="emit('close-modal')"/>
        </div>
        <div class="my-modal__overlay" @click="emit('close-modal')"/>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import ModalCloseIcon from "@/components/Modals/ModalCloseIcon/ModalCloseIcon.vue";
import ModalHeader from "@/components/Modals/ModalHeader/ModalHeader.vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Заголовок'
  },
  padding: {
    type: String,
    default: '32px',
  },
  width: {
    type: String,
    default: '560px'
  },
})

const emit = defineEmits(['close-modal']);
</script>

<style scoped lang="scss">
@import "modal";
</style>