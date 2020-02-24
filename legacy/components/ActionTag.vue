<template lang="html">
  <div class="action-tag" @click="handleAction">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: [
    'params'
  ],
  methods: {
    handleAction() {
      console.log(this.params)
      this.$router.push({ name: 'Preview', params: this.params })
      console.log('Action')
    }
  }
}
</script>

<style lang="scss" scoped>
.action-tag {
  cursor: pointer;
}
</style>
