<template>
  <div class="category-wrapper">
    <router-link
      ref="card"
      class="category"
      :data-background-image="thumbnail"
      :class="{ highlight: center }"
      :to="link"
    >
      <h2>{{ title }}</h2>
      <div class="wrapper">
        <span class="description" v-if="center" v-html="description"></span>
        <div class="button" type="button">Mehr erfahren</div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { LocationAsPath } from "vue-router";
import lozad from "lozad";

export default {
  props: {
    title: String,
    parent: String,
    description: String,
    thumbnail: String,
    type: String,
  },
  setup(props) {
    const link = computed(
      () => `/${props.type}/${props.parent}/${props.title}`
    );

    const thumbnail = computed(
      () => `http://localhost:3001/media/${props.thumbnail}`
    );

    const center = ref(false);

    const card = ref(null);

    onMounted(() => {
      const imageObserver = lozad(card.value.$el);
      imageObserver.observe();

      let options: IntersectionObserverInit = {
        root: null,
        rootMargin: `0px -${(document.body.clientWidth / 2 - 300).toFixed()}px`,
        threshold: 1,
      };
      const centerObserver = new IntersectionObserver((entries) => {
        center.value = entries[0].isIntersecting;
      }, options);
      centerObserver.observe(card.value.$el);
    });

    return { center, link, thumbnail, card };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";
.category-wrapper {
  scroll-snap-align: center;
  display: inline-block;
  width: 40vh;
  height: 60vh;
  padding: 1.5rem;
  transform: translateY(-37%);
  margin-top: 50vh;
  vertical-align: bottom;
}
.category {
  border-radius: $rounding;
  white-space: initial;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  transition: transform 200ms, background-color 200ms;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba($black, 0.3);
  background-blend-mode: darken;
  background-image: url("../assets/placeholder.svg");
  text-align: center;
  text-decoration: none;
  overflow-y: auto;
  h2 {
    display: block;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    opacity: 0;
    transition: opacity 250ms;
    .button {
      text-decoration: underline;
      background-color: $primary;
      flex-grow: 1;
    }
  }
}
.highlight {
  transform: scale(1.1);
  background-color: rgba($black, 0.5);
  .wrapper {
    span {
      transform: scaleY(1);
    }
    opacity: 1;
  }
}
</style>
