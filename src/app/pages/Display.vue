<template lang="html">
  <div class="page">
    <div class="player"
      v-if="image"
      :style="{ backgroundImage: `url(${image})`}">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { ipcRenderer } from 'electron'

@Component({
  metaInfo: {
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
.player {
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
