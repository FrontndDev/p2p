<template>
  <div class="loader">
    <div class="loader__content"/>
  </div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
@import "@/assets/scss/mixins";

.loader {
  @include flex-center;
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
  position: fixed;
  inset: 0;
  z-index: 1000000;

  &__content {
    width: 88px;
    height: 49.3px;
    background: radial-gradient(farthest-side,#b043ff 90%,#0000) 0   50%/21.1px 21.1px,
    radial-gradient(farthest-side at bottom,#b043ff 90%,#0000) 50%  calc(50% - 5.3px)/21.1px 10.6px,
    radial-gradient(farthest-side at top   ,#b043ff 90%,#0000) 50%  calc(50% + 5.3px)/21.1px 10.6px,
    radial-gradient(farthest-side at bottom,#b043ff 90%,#0000) 100% calc(50% - 5.3px)/21.1px 10.6px,
    radial-gradient(farthest-side at top   ,#b043ff 90%,#0000) 100% calc(50% + 5.3px)/21.1px 10.6px;
    background-repeat: no-repeat;
    animation: loader 1.4s infinite;
  }
}

@keyframes loader {
  25% {
    background-position: 0    50%,50% 0,50% 100%,100% 0,100% 100%;
  }

  50% {
    background-position: 100% 50%,0   0,0   100%,50%  0,50%  100%;
  }

  75%, 100% {
    background-position: 100% 50%,0 calc(50% - 5.3px),0 calc(50% + 5.3px),50% calc(50% - 5.3px),50% calc(50% + 5.3px);
  }
}
</style>
