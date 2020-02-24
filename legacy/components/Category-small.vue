<template lang="html">
  <div class="category">
    <h2>{{ category.name }}</h2>
    <div class="elements">
      <div v-if="category.elements" v-for="(element, index) in category.elements" :key="index">
        <Category
          v-if="element.type === 'category'"
          :category="element"></Category>
        <Media
          v-if="element.type === 'media'"
          :media="element"
          :category="category.name"></Media>
      </div>
    </div>
  </div>
</template>

<script>
import Media from '@/components/Media.vue'
export default {
  name: 'CategorySmall',
  props: [
    'category'
  ],
  components: {
    Media
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
.category {
  margin-top: 1rem;
}
.elements {
  margin-left: 1rem;
}
</style>
