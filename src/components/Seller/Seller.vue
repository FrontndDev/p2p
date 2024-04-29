<template>
  <div class="seller" :class="props.type">
    <img
        alt="avatar"
        class="seller__avatar"
        :src="props.avatar"
    >

    <div class="seller__info">
      <div class="seller__name" :title="getNameWithoutHTMLTags" v-html="props.name"/>
      <div class="seller__description">
        <div>{{ props.successfulNum }} <template v-if="typeof props.doneNum !== 'number'">успешных</template> сделок</div>

        <template v-if="typeof doneNum === 'number'">
          <span>|</span>
          <div>{{ props.doneNum }}% выполнено</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  PropType
} from "vue";

const props = defineProps({
  type: {
    type: String as PropType<'' | 'seller-modal'>,
    default: '',
  },
  name: {
    type: String,
    default: 'Name'
  },
  avatar: {
    type: String,
    required: true,
  },
  successfulNum: {
    type: Number,
    default: 0
  },
  doneNum: {
    type: (Number || String) as PropType<number | string>,
    default: 0
  }
})

const getNameWithoutHTMLTags = computed(() => props.name?.replace(/(<([^>]+)>)/gi, ''))
</script>

<style scoped lang="scss">
@import "seller";
</style>