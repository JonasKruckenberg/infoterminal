<template>
  <div class="content-control">
    <img
      v-show="active"
      svg-inline
      class="icon"
      src="../assets/icons/pause-solid.svg"
      @click="pause"
    />
    <img
      v-show="!active"
      svg-inline
      class="icon"
      src="../assets/icons/play-solid.svg"
      @click="play"
    />
    <button @click="mute">mute</button>
  </div>
</template>
<script lang="ts">
import { inject, onMounted, ref, watch } from "vue";
import { PlaybackControl } from "../plugins/playback-control";

export default {
  props: {
    mediaid: String,
  },
  setup(props) {
    const playbackControl = inject<PlaybackControl>("playback");
    const active = ref(true);
    const muted = ref(false);

    watch(
      () => props.mediaid,
      (id) => {
        playbackControl.setResource(id);
      }
    );

    function play() {
      playbackControl.play();
      active.value = true;
    }
    function pause() {
      playbackControl.pause();
      active.value = false;
    }
    function mute() {
      if (muted.value) {
        playbackControl.unmute();
        muted.value = false;
      } else {
        playbackControl.mute();
        muted.value = true;
      }
    }

    return { active, play, pause, mute };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";
.content-control {
  display: flex;
  justify-content: center;
}
.icon {
  color: $white;
  opacity: 0.5;
  animation: appear 150ms;
}

@keyframes appear {
  0% {
    transform: scale(0.7);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
