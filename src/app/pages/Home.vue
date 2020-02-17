<template lang="html">
  <div class="">
    <h1>Welcome You! 💖</h1>
    <router-link :to="{ name: 'Control', params: {} }">Control</router-link>
    <router-link :to="{ name: 'Display', params: {} }">Display</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
