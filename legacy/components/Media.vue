<template lang="html">
  <div class="media" @click="$emit('click')">
    <h2>{{ media.name }}</h2>
  </div>
</template>

<script>
import ActionTag from '@/components/ActionTag.vue'
export default {
  props: [
    'media',
    'category'
  ],
  components: {
    ActionTag
  },
  computed: {
    image() {
      if (this.category.buffer) {
        const b = new Blob([this.category.buffer])
        return URL.createObjectURL(b)
      } else {
        return this.category.url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
