<template>
  <router-link class="category" :class="{ highlight: center}" :to="link">{{title}}</router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Location } from "vue-router";
import lozad from "lozad";
import { threadId } from "worker_threads";

@Component
export default class Category extends Vue {
  @Prop()
  parent: string;
  @Prop()
  title: string;
  @Prop({ default: "media" })
  type: string;
  @Prop()
  thumbnail: string;

  center: boolean = false;
  centerObserver: IntersectionObserver;

  mounted() {
    let options: IntersectionObserverInit = {
      trackVisibility: false,
      root: null,
      rootMargin: `0px -${document.body.clientWidth / 2 - 180}px`,
      threshold: 720 / window.innerHeight
    };

    this.centerObserver = new IntersectionObserver(entries => {
      if (this.center !== entries[0].isIntersecting)
        this.center = entries[0].isIntersecting;

      // this.center = entries[0].isIntersecting === this.center;
    }, options);
    this.centerObserver.observe(this.$el);
  }
  destroyed() {
    this.centerObserver.disconnect();
  }

  get link() {
    const out: Location = { params: { path: "" } };
    if (this.type === "category") out.name = "Categories";
    if (this.type === "map") out.name = "Map";
    if (this.type === "media") out.name = "Preview";
    if (this.parent) out.params.path += this.parent + ".";
    out.params.path += this.title;
    return out;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.category {
  scroll-snap-align: center;
  width: 9rem * 2.5;
  height: 13rem * 2.5;
  margin: 1rem;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: $rounding;
  background-repeat: no-repeat;
  background-color: green;
  // background-size: cover;
  // background-position: center;
  // background-color: rgba($black, 0.4);
  // background-blend-mode: darken;
  transform: scale(1);
  transition: transform 200ms, opacity 300ms, position 300ms, height 200ms;
  color: $white;
  text-decoration: none;
  h2 {
    text-align: center;
  }
  .button {
    opacity: 0;
    background-color: $primary;
    flex-grow: 1;
  }
  &:focus {
    outline: none;
  }
}
.highlight {
  color: red;
  box-shadow: $shadow-small;
  transform: scale(1.1);
  .button {
    opacity: 1;
  }
}
</style>
