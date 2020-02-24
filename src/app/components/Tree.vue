<template lang="html">
  <div class="tree-view">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.tree-view {
  display: flex;
  flex-direction: column;
}
</style>
