<template lang="html">
  <transition name="fade">
    <router-view/>
  </transition>
</template>

<script>
export default {
}
</script>

<style lang="scss">
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
