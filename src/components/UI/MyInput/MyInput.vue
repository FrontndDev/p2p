<template>
  <div class="my-input">
    <div class="my-input__title" v-if="props.title">{{ props.title }}</div>
    <div class="my-input__field" :class="props.currency ? `currency-${props.currency} bg-currency small-icon` : ''">
      <template v-if="props.icon">
        <img :src="props.icon" alt="icon" ref="icon" v-if="typeof props.icon === 'string'">
        <component ref="icon" :is="props.icon" v-else/>
      </template>
      <input
          ref="input"
          :disabled="props.disabled"
          :type="props.type"
          :style="getInputWidth"
          :placeholder="props.placeholder"
          :value="props.value"
          @input="inputValue($event)"
          @blur="emit('blur')"
      >
    </div>

    <div class="my-input__wallet" ref="wallet" v-if="props.wallet">
      <span>{{ props.wallet }}</span>|<span @click="emit('all')">Все</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  PropType,
  Ref,
  ref,
  watch
} from "vue";

const props = defineProps({
  type: {
    type: String as PropType<'text' | 'number' | 'tel'>,
    default: 'text'
  },
  title: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  wallet: {
    type: String,
    default: ''
  },
  icon: {
    type: String as PropType<string | SVGAElement>,
  },
  currency: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  regExp: {
    type: RegExp as PropType<RegExp>,
  }
});

const emit = defineEmits(['inputValue', 'blur', 'all']);

const input = ref();

const wallet: Ref<HTMLDivElement | undefined> = ref();
const icon: Ref<HTMLDivElement | undefined> = ref();

const getInputWidth = computed(() => {
  const walletWidth = wallet.value?.offsetWidth ?? 0;
  const iconWidth = icon.value?.offsetWidth ?? 0;
  const width = walletWidth + iconWidth + 16;

  return `width: calc(100% - ${width}px);`
});

const inputValue = (e: Event) => {
  const event = e.target as HTMLInputElement
  const value = props.regExp ? event.value.replace(props.regExp, '') : event.value
  input.value.value = value
  emit('inputValue', value)
}

watch(() => props.value, () => {
  input.value.value = props.value
})
</script>

<style scoped lang="scss">
@import "myInput";
</style>