<template lang="html">
  <div class="page">
    <div class="player"
      v-if="image"
      :style="{ backgroundImage: `url(${image})`}">
    </div>
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
  image: string = null
  video: string = null
  external: string = null

  mounted() {
    // register all the event handler
    ipcRenderer.on('start',(e, args) => {
      // start the playback
      console.log(args)
      this.image = args
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
}
.player {
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
