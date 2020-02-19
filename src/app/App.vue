<template lang="html">
  <transition name="fade">
    <router-view/>
  </transition>
</template>

<script lang="ts">
import { version } from '../../package.json'
import * as firebase from "firebase/app"

export default {
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | Infoterminal App',
    changed(metaInfo) {
      firebase.analytics().setCurrentScreen(metaInfo.title)
      firebase.analytics().logEvent('page_view')
      firebase.analytics().logEvent('screen_view', {
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
