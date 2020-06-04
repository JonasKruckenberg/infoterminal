<template>
  <div class="page">
    <div class="preview scrollbar" :data-background-image="thumbnail">
      <BackButton />
      <h2>{{ title }}</h2>
      <span class="description" v-html="description"></span>
    </div>
    <ContentControl :path="media" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ContentControl from "../components/ContentControl.vue";
import marked from "marked";
import DOMPurify from "dompurify";
import lozad from "lozad";
const { ipcRenderer } = window;

@Component({
  components: {
    ContentControl: () => import("../components/ContentControl.vue"),
    BackButton: () => import("../components/back.vue")
  }
})
export default class Preview extends Vue {
  @Prop({ required: true })
  path: string;

  description: string = "";
  thumbnail: string = "";
  media: string = null;

  get title() {
    return this.path.split(".").pop();
  }

  mounted() {
    const observer = lozad(this.$el.children[0]);
    observer.observe();
  }
  async created() {
    await this.fetchData();
  }
  async fetchData() {
    const data = await ipcRenderer.invoke("media.get", this.path);
    this.description = DOMPurify.sanitize(marked(data.description || ""));
    this.thumbnail = data.thumbnail;
    this.media = data.media;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";
.page {
  padding: 10vh 5vw;
}
.preview {
  width: 100%;
  height: 100%;
  border-radius: $rounding;
  padding: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba($black, 0.6);
  background-blend-mode: darken;
  overflow: auto;

  h2 {
    margin-bottom: 1rem;
  }
  .description {
    display: block;
    font-size: 1.2rem;
    max-width: 100vw;
    //max-height: 100vh;
    white-space: initial;
  }
}
</style>
