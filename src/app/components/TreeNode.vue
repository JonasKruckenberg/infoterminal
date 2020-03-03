<template lang="html">
  <div class="media">
    <input type="radio"
      name="tree-nodes"
      :id="'radiobutton-' + title"
      @click="$emit('select')">
    <label :for="'radiobutton-' + title"
      :style="`background-image: url(${preview})`">
      <h3>{{ title }}</h3>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class TreeNode extends Vue {
  @Prop()
  title: string
  @Prop()
  preview: string
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';
  .media {
    scroll-snap-align: center;
    position: relative;
    color: $white;
    min-width: 10rem;
    min-height: 10rem;
    margin: 1.5rem;
    & input:checked ~ label {
      box-shadow: $shadow-hover;
      transform: scale(1.2);
    }
    label {
      display: flex;
      flex-direction: column-reverse;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-color: rgba($black,0.5);
      background-blend-mode: darken;
      width: 100%;
      height: 100%;
      border-radius: .6rem;
      transition: transform 150ms;
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
</style>
