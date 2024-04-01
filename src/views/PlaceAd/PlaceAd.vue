<template>
  <div class="place-ad">
    <Ad/>
    <AdInformation/>
  </div>
</template>

<script setup lang="ts">
import Ad from "@/views/PlaceAd/Ad/Ad.vue";
import AdInformation from "@/views/PlaceAd/AdInformation/AdInformation.vue";
</script>

<style scoped lang="scss">
@import "placeAd";
</style>