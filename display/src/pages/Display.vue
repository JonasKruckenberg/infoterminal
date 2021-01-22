<template>
  <div class="page">
    <transition name="fade">
      <!-- <img v-if="type === 'image'" class="player" :src="path" /> -->
      <video class="player" ref="videoplayer" autoplay />
      <!-- <iframe
        v-if="type === 'web'"
        class="player"
        :src="path"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      /> -->
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from "vue";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { gql } from "graphql-request";

const client = new SubscriptionClient("ws://localhost:3001/graphql");

export default {
  setup() {
    const playing = ref(true);
    const muted = ref(false);
    const source = ref(null);
    const videoplayer = ref<HTMLVideoElement>(null);

    // watch(playing, (val) =>
    //   val ? videoplayer.value.play() : videoplayer.value.pause()
    // );

    const res = client.request({
      query: gql`
        subscription {
          playbackStateChanged {
            playing
            source
            muted
          }
        }
      `,
    });

    res.subscribe({
      next: ({ data: { playbackStateChanged: data } }) => {
        if (data.playing !== null) {
          playing.value = data.playing;
          videoplayer.value.paused;
          if (playing.value) {
            videoplayer.value.play();
          } else {
            videoplayer.value.pause();
          }
        }
        if (data.muted !== null) {
          muted.value = data.muted;
          videoplayer.value.muted = muted.value;
        }
        if (data.source !== null) {
          source.value = `http://localhost:3001/media${data.source}`;
        }
      },
    });

    return { videoplayer };
  },
};
</script>

<!-- <script lang="ts">
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
</script> -->

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
