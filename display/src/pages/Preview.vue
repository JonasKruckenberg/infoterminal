import { ref } from 'vue';
<template>
  <div class="page">
    <div
      ref="preview"
      class="preview scrollbar"
      :data-background-image="thumbnail"
    >
      <BackButton />
      <h2>{{ title }}</h2>
      <span class="description" v-html="description"></span>
    </div>
    <PlaybackControl :mediaid="mediaID" />
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { gql, GraphQLClient } from "graphql-request";
import lozad from "lozad";
import marked from "marked";
import DOMPurify from "dompurify";

import BackButton from "../components/BackButton.vue";
import PlaybackControl from "../components/PlaybackControl.vue";

const client = new GraphQLClient("http://localhost:3001/graphql");

export default {
  components: {
    BackButton,
    PlaybackControl,
  },
  props: {
    id: String,
  },
  setup(props) {
    const title = ref("");

    const description = ref("");

    const thumbnailID = ref("");

    const thumbnail = computed(
      () => `http://localhost:3001/media/${thumbnailID.value}`
    );

    const mediaID = ref("");

    const preview = ref(null);

    onMounted(async () => {
      const query = gql`{
        mediaResource(id:"MediaResource:/${props.id}") {
          title
          description
          thumbnail
          media
        }
      }`;
      const { mediaResource } = await client.request(query);
      title.value = mediaResource.title;
      description.value = DOMPurify.sanitize(marked(mediaResource.description));
      thumbnailID.value = mediaResource.thumbnail;
      mediaID.value = mediaResource.media;

      const observer = lozad(preview.value);
      observer.observe();
    });

    return { title, description, thumbnail, mediaID, preview };
  },
};
</script>

<!-- <script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ContentControl from "../components/ContentControl.vue";



@Component({
  components: {
    ContentControl: () => import("../components/ContentControl.vue"),
    BackButton: () => import("../components/BackButton.vue"),
  },
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
</script> -->

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
