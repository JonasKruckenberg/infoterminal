<template lang="html">
  <div class="playbackcontrol">
    <img v-show="active"
      svg-inline
      class="icon"
      src="@/assets/pause-solid.svg"
      @click="pause"/>
    <img v-show="!active"
      svg-inline
      class="icon"
      src="@/assets/play-solid.svg"
      @click="play"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const { ipcRenderer } = window

@Component
export default class PlaybackControl extends Vue {
  active:boolean = true

  async pause() {
    const displayId = await ipcRenderer.invoke('get-display-id')
    ipcRenderer.sendTo(displayId,'pause')
    this.active = false
  }
  async play() {
    const displayId = await ipcRenderer.invoke('get-display-id')
    ipcRenderer.sendTo(displayId,'play')
    this.active = true
  }
}
</script>

<style lang="scss" scoped>
@import '@/variables.scss';
.playbackcontrol {
  display: flex;
  justify-content: center;
}
.icon {
  color: $white;
  opacity: .5;
  animation: appear 150ms;
}

@keyframes appear {
  0% {
    transform: scale(.7);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
