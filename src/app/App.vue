<template lang="html">
  <transition name="fade">
    <router-view/>
  </transition>
</template>

<script lang="ts">
import { version } from '../../package.json'

export default {
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | Infoterminal App',
    changed(metaInfo) {
      // this.$gtag.screenview({
      //   app_name: 'Nabu Infoterminal',
      //   screen_name: metaInfo.title,
      //   app_version: version
      // })
    }
  }
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
