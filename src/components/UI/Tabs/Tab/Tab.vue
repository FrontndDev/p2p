<template>
  <div
      class="my-tab"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
      @click.stop="emit('tab', props.tab)"
  >
    {{ props.tab.name }} {{ props.tab.value }}
    <!--    <MyCheckbox-->
    <!--        :value="teleportCheckbox"-->
    <!--        v-if="props.tab?.checkbox"-->
    <!--        @set-value="value => emit('set-checkbox-value', value, props.tab.id)"-->
    <!--    />-->

    <!--    <MyTooltip-->
    <!--        :text="props.tab?.tooltip"-->
    <!--        v-if="props.tab?.tooltip && showMyTooltip"-->
    <!--    />-->
  </div>
</template>

<script setup lang="ts">
import {
  PropType,
  ref,
} from "vue";
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";

const emit = defineEmits(['tab', 'set-checkbox-value']);

const props = defineProps({
  tab: {
    type: Object as PropType<ITabs>,
    required: true,
  }
})

const showMyTooltip = ref(false)

const showTooltip = () => {
  if (window.innerWidth > 992) {
    showMyTooltip.value = true
  }
}

const hideTooltip = () => {
  showMyTooltip.value = false
}
</script>

<style scoped lang="scss">
@import "tab";
</style>