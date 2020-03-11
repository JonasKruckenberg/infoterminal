<template lang="html">
  <div class="page">
    <transition name="fade">
      <img v-if="mime == 'image/jpg' || mime == 'image/png'"
        class="player"
        :src="media">
      <video v-else-if="mime == 'video/mp4'"
        ref="videoplayer"
        class="player"
        :src="media"
        :key="media"
        autoplay></video>
      <iframe v-else-if="mime == 'application/html'"
        :src="media"
        class="player"></iframe>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { ipcRenderer } from 'electron'

@Component({
  metaInfo: {
    titleTemplate: '%s | Infoterminal App',
    title: 'Display'
  }
})
export default class Display extends Vue {
  media: string = null
  mime: string = null

  mounted() {
    // register all the event handler
    ipcRenderer.on('start',(e, args) => {
      // start the playback
      this.media = args.media
      this.mime = args.mime
    })
    ipcRenderer.on('pause',(e, args) => {
      // pause the playback
      if (this.mime == 'video/mp4') {
        this.$refs.videoplayer.pause()
      }
    })
    ipcRenderer.on('play',(e, args) => {
      // resume the playback
      if (this.mime == 'video/mp4') {
        this.$refs.videoplayer.play()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
}
.player {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  object-position: center;
  object-fit: cover;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
