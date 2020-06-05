<template>
  <div class="content-control" v-if="path && type === 'video'">
    <!-- {{ path }} -->
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
const { ipcRenderer } = window;

@Component
export default class ContentControl extends Vue {
  @Prop()
  path: string;

  active: boolean = false;

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
    this.play();
  }
  async play() {
    const displayId = await ipcRenderer.invoke("main.display.id");
    ipcRenderer.sendTo(displayId, "play", this.path);
    this.active = true;
  }
  async pause() {
    const displayId = await ipcRenderer.invoke("main.display.id");
    ipcRenderer.sendTo(displayId, "pause");
    this.active = false;
  }
}
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
