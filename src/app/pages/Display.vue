<template>
  <div class="page" v-if="type">
    <transition name="fade">
      <img v-if="type === 'image'" class="player" :src="path" />
      <video v-if="type === 'video'" class="player" :src="path" ref="videoplayer" autoplay />
      <iframe
        v-if="type === 'web'"
        class="player"
        :src="path"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
const { ipcRenderer } = window;

@Component
export default class Display extends Vue {
  $refs: {
    videoplayer: HTMLVideoElement;
  };

  path: string = "";

  get type() {
    if (this.path.startsWith("https://")) {
      return "web";
    } else if (this.path.startsWith("file:///")) {
      if (this.path.endsWith(".png") || this.path.endsWith(".jpg")) {
        return "image";
      }
      if (this.path.endsWith(".mp4")) {
        return "video";
      }
    }
    return null;
  }

  mounted() {
    ipcRenderer.on("play", (e, path) => {
      // resume the playback
      if (this.path !== path) this.path = path;
      if (this.type === "video" && this.$refs.videoplayer) {
        this.$refs.videoplayer.play();
      }
    });
    ipcRenderer.on("pause", e => {
      // pause the playback
      if (this.type === "video") {
        this.$refs.videoplayer.pause();
      }
    });
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
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
