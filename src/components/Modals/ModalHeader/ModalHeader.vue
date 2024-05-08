<template>
  <div class="my-modal-header" :class="{ 'with-action': props.action }">
    <div class="my-modal-header__back" @click="emit('back')" v-show="props.action === 'back'">
      <ArrowIcon/>

      Назад
    </div>
    <div class="my-modal-header__title" v-show="props.showTitle">{{ props.title }}</div>
    <ModalCloseIcon size="big" @click="emit('close-modal')"/>
  </div>
</template>

<script setup lang="ts">
import ModalCloseIcon from "@/components/Modals/ModalCloseIcon/ModalCloseIcon.vue";
// @ts-ignore
import ArrowIcon from '@/assets/svg/littleArrow.svg?component';
import {
  PropType
} from "vue";

const props = defineProps({
  action: {
    type: String as PropType<'' | 'back'>,
    required: true,
  },
  showTitle: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['close-modal', 'back']);
</script>

<style scoped lang="scss">
@import "modalHeader";
</style>