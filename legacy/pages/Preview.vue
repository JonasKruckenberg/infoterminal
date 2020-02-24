<template lang="html">
<div class="page">
  <h1>{{ previewName }}</h1>
  <p>{{ previewDescription }}</p>
</div>
</template>

<script>
export default {
  props: [
    'previewName',
    'coordinates',
    'previewDescription',
    'buffer',
    'url'
  ]
}
</script>

<style lang="css" scoped>
</style>
