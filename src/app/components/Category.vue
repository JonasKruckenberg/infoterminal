<template lang="html">
  <router-link :to="{ name: 'Category', query: {
      id,
      title,
      description,
      coordinates,
      preview,
      children,
      type }}"
    class="category"
    :style="{backgroundImage: `url(${preview})`}">
    <h2 style="transition: opacity 200ms;">{{ title }}</h2>
    <div class="wrapper" style="display: flex; width: 100%;">
      <div class="button" type="button">Mehr erfahren</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Category extends Vue {
  @Prop()
  id: string
  @Prop()
  type: string
  @Prop()
  title: string
  @Prop()
  description: string
  @Prop()
  coordinates: [ number, number ]
  @Prop()
  children: Array<TreeElement>
  @Prop()
  preview: string
  @Prop()
  index: number

  mounted() {
    if (this.index == 1) {
      this.$el.scrollIntoView()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';
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
  background-size: cover;
  background-position: center;
  background-color: rgba($black,0.4);
  background-blend-mode: darken;
  transform: scale(1);
  transition: transform 200ms, opacity 300ms, position 300ms, height 200ms;
  color: $white;
  text-decoration: none;
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
  box-shadow: $shadow-small;
  transform: scale(1.1);
  .button {
    opacity: 1;
  }
}
</style>
