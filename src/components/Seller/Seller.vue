<template>
  <div class="seller" :class="props.type">
    <img
        alt="avatar"
        class="seller__avatar"
        :src="props.avatar"
    >

    <div class="seller__info">
      <div class="seller__name" :title="getNameWithoutHTMLTags" v-html="props.name"/>
      <div class="seller__description" v-if="props.statistics">
        <div>{{ props.statistics?.transactionsCount ?? 0 }} сделок</div>
        <span>|</span>
        <div>{{ props.statistics?.successPercent ?? 0 }}% выполнено</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  PropType
} from "vue";
import { IStatistics } from "@/interfaces/store/modules/profile.interface.ts";

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
  statistics: {
    type: Object as PropType<IStatistics | null>,
    required: true,
  },
})

const getNameWithoutHTMLTags = computed(() => props.name?.replace(/(<([^>]+)>)/gi, ''))
</script>

<style scoped lang="scss">
@import "seller";
</style>