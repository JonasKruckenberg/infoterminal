<template lang="html">
  <div class="player"
    v-if="image"
    :style="{ backgroundImage: `url(${image})`}">
  </div>
</template>

<script>
import Vue from 'vue'
import { ipcRenderer } from 'electron'
export default Vue.extend({
  metaInfo: {
    title: 'Display',
  },
  data() {
    return {
      image: null,
      video: null,
      external: null
    }
  },
  mounted() {
    // register all the event handler
    ipcRenderer.on('start',(e, args) => {
      // start the playback
      console.log(args)
      this.image = args
    })
  }
})
</script>

<style lang="scss" scoped>
.player {
  width: 100vw;
  height: 100vh;
}
</style>
