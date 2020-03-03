<template lang="html">
  <div class="media" :style="`background-image: url(${url})`">
    <h3>{{ title }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Media extends Vue {
  @Prop()
  title: string
  @Prop()
  url: string
  
}
</script>

<style lang="css" scoped>
</style>
