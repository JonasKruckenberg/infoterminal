<template lang="html">
  <transition name="fade">
    <router-view/>
  </transition>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 200ms;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}
</style>
