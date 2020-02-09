<template lang="html">
  <div class="menu-item" @click="clickHandler">
    <h2>{{ title }}</h2>
    <img :src="icon" alt="">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: { type: String },
    url: { type: String },
    icon: { type: String }
  },
  methods: {
    clickHandler() {

    }
  }
})
</script>

<style lang="scss" scoped>
</style>
