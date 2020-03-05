<template lang="html">
  <transition name="fade">
    <router-view/>
  </transition>
</template>

<script lang="ts">
import { version } from '../../package.json'
import Vue from 'vue'

export default {
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | Infoterminal App',
    changed(metaInfo) {
      window.$analytics.setCurrentScreen(metaInfo.title)
      window.$analytics.logEvent('page_view')
      window.$analytics.logEvent('screen_view', {
        app_name: 'infoterminal-app',
        screen_name: metaInfo.title,
        app_version: version
      })
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
