<template lang="html">
  <div class="media" :style="`background-image: url(${url})`">
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'url'
  ]
}
</script>

<style lang="css" scoped>
</style>
