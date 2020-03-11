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

import { remote, ipcRenderer } from 'electron'
const displayId = remote.getGlobal('displayId')

@Component
export default class PlaybackControl extends Vue {
  active:boolean = true

  pause() {
    ipcRenderer.sendTo(displayId,'pause')
    this.active = false
  }
  play() {
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
