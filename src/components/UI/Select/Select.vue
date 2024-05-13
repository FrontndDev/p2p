<template>
  <div class="my-select" :tabindex="1" @blur="showDropdown = false">
    <div class="my-select__up" :class="{ opened: showDropdown }" @click="showDropdown = !showDropdown">
      <div class="my-select__info">
        <div class="my-select__title" v-if="props.title">
          {{ props.title }}
        </div>
        <div class="my-select__text" :class="props.isCurrency ? `currency-${props.selectedItem?.name} bg-currency small-icon` : ''">
          <template v-if="props.selectedItem?.icon">
            <img :src="props.selectedItem?.icon" :alt="props.selectedItem?.name" v-if="typeof props.selectedItem?.icon === 'string'">
            <template>{{ props.selectedItem?.icon }}</template>
          </template>

<!--          <span>{{ props.selectedItem?.name }}</span>-->
          <input
              type="text"
              ref="input"
              @input="searchItems"
              @blur="closeDropdown"
          >
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36648 5.61324C2.56174 5.41798 2.87832 5.41798 3.07359 5.61324L7.42025 9.95991C7.73832 10.278 8.26174 10.278 8.57981 9.95991L12.9265 5.61324C13.1217 5.41798 13.4383 5.41798 13.6336 5.61324C13.8288 5.80851 13.8288 6.12509 13.6336 6.32035L9.28692 10.667C8.57832 11.3756 7.42174 11.3756 6.71315 10.667L2.36648 6.32035C2.17122 6.12509 2.17122 5.80851 2.36648 5.61324Z" fill="#576175"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36648 5.61324C2.56174 5.41798 2.87832 5.41798 3.07359 5.61324L7.42025 9.95991C7.73832 10.278 8.26174 10.278 8.57981 9.95991L12.9265 5.61324C13.1217 5.41798 13.4383 5.41798 13.6336 5.61324C13.8288 5.80851 13.8288 6.12509 13.6336 6.32035L9.28692 10.667C8.57832 11.3756 7.42174 11.3756 6.71315 10.667L2.36648 6.32035C2.17122 6.12509 2.17122 5.80851 2.36648 5.61324Z" fill="#576175"/>
      </svg>
    </div>

    <div class="my-select__down" v-if="showDropdown">
      <div
          class="my-select__item"
          :class="[{ active: props.selectedItem?.id === item.id }]"
          v-for="item in filteredDropdown"
          :key="item.id"
          @click="selectItem(item)"
      >
        <div :class="props.isCurrency ? `currency-${item.name} bg-currency small-icon` : ''">
          <template v-if="item?.icon">
            <img :src="item?.icon" :alt="item?.icon" v-if="typeof item?.icon === 'string'">
            <template>{{ item?.icon }}</template>
          </template>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  PropType,
  Ref,
  ref,
  watch,
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";

const props = defineProps({
  id: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Array as PropType<ISelect[]>,
    required: true,
  },
  selectedItem: {
    type: Object as PropType<ISelect | null>,
    default: null,
  },
  isCurrency: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['select']);

const input: Ref<HTMLInputElement> = ref();
const showDropdown = ref(false);
const search: Ref<string> = ref('');

const filteredDropdown = computed(() => {
  const items = props.items.filter(item => item.name.includes(search.value))

  return items.length ? items : props.items
})

const closeDropdown = () => {
  setTimeout(() => showDropdown.value = false, 250);
}

const searchItems = (event: Event) => {
  search.value = (event.target as HTMLInputElement).value
}

const selectItem = (item: ISelect) => {
  search.value = ''
  emit('select', item, props.id);
  showDropdown.value = false
}

watch(() => props.selectedItem?.name, () => {
  console.log('props.selectedItem?.name', props.selectedItem?.name, input.value)
  input.value.value = props.selectedItem?.name
})

onMounted(() => {
  console.log('props.selectedItem?.name', props.selectedItem?.name, input.value)
  input.value.value = props.selectedItem?.name
})
</script>

<style scoped lang="scss">
@import "select";
</style>