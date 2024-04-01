<template>
  <div class="title-h1">{{ route.meta.title }}</div>

  <div class="main-layout">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route: any = useRoute();
</script>

<style scoped lang="scss">
@import "mainLayout";
</style>