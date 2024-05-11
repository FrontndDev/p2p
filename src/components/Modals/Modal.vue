<template>
  <Teleport to="#p2p-app">
    <Transition name="modal">
      <div class="my-modal">
        <div class="my-modal__content" :style="`padding: ${props.padding}; max-width: ${width};`">
          <ModalHeader
              :title="props.title"
              :show-title="props.showTitle"
              :action="props.actionInHeader"
              @back="emit('close-modal')"
          />

          <slot name="content"/>

          <ModalCloseIcon size="little" @click="emit('close-modal')"/>
        </div>
        <div class="my-modal__overlay" v-if="!props.hideOverlay" @click="emit('close-modal')"/>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import ModalCloseIcon from "@/components/Modals/ModalCloseIcon/ModalCloseIcon.vue";
import ModalHeader from "@/components/Modals/ModalHeader/ModalHeader.vue";
import { PropType } from "vue";

const props = defineProps({
  actionInHeader: {
    type: String as PropType<'' | 'back'>,
    default: '',
  },
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
    default: ''
  },
  padding: {
    type: String,
    default: '32px',
  },
  width: {
    type: String,
    default: '560px'
  },
  hideOverlay: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['close-modal']);
</script>

<style scoped lang="scss">
@import "modal";
</style>