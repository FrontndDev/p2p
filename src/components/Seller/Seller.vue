<template>
  <div class="seller" :class="props.type">
    <img
        src="http://localhost:5173/app/p2p/Social%20Lift%20-%20%D0%B4%D0%BE%D1%85%D0%BE%D0%B4%D0%BD%D1%8B%D0%B5%20%D1%81%D0%B2%D1%8F%D0%B7%D0%BA%D0%B8_files/2969585.blockies.jpg"
        alt="avatar"
        class="seller__avatar"
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
  successfulNum: {
    type: Number,
    default: 0
  },
  doneNum: {
    type: (Number || String) as PropType<number | string>,
    default: 0
  }
})

const getNameWithoutHTMLTags = computed(() => props.name.replace(/(<([^>]+)>)/gi, ''))
</script>

<style scoped lang="scss">
@import "seller";
</style>