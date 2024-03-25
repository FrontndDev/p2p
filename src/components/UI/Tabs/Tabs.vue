<template>
  <div class="my-tabs" :class="props.type">
    <Tab
        :class="[props.type, { active: selectedTab?.id === tab.id }]"
        v-for="tab in props.tabs"
        :key="tab.id"
        :tab="tab"
        @tab="selectTab"
        @click="setTab(tab.id)"
    />
  </div>
</template>

<script setup lang="ts">
import Tab from "@/components/UI/Tabs/Tab/Tab.vue";
import {
  onMounted,
  PropType,
  Ref,
  ref
} from "vue";
import { ITabs } from "@/components/UI/Tabs/tabs.interface.ts";

const emit = defineEmits(['set-tab'])

const props = defineProps({
  type: {
    type: String as PropType<'header-tabs'>,
    default: '',
  },
  tabs: {
    type: Array as PropType<ITabs[]>,
    required: true,
  }
})

let selectedTab: Ref<ITabs | null> = ref(null);

const selectTab = (tab: any) => {
  selectedTab.value = tab
}

const setTab = (id: number) => {
  emit('set-tab', props.tabs?.find(tab => tab.id === id))
}

onMounted(() => {
  selectedTab.value = props.tabs[0]
})
</script>

<style scoped lang="scss">
@import "tabs";
</style>