<template lang="html">
  <div class="page preview-list">
    <h1>{{ name }}</h1>
    <button type="button" @click="$router.push('/')">back</button>
    <TreeElement v-for="element in elements" :key="element.name"
      :name="element.name"
      :description="element.description"
      :preview="element.type == 'media'"
      :children="element.elements">
    </TreeElement>
    <router-view></router-view>
  </div>
</template>

<script>
import TreeElement from '@/components/TreeElement.vue'
export default {
  props: [
    'name',
    'description',
    'coordinates',
    'type',
    'buffer',
    'url',
    'elements'
  ],
  data() {
    return {
      current: {
        name: this.name,
        description: this.description,
        coordinates: this.coordinates,
        buffer: this.buffer,
        url: this.url
      }
    }
  },
  components: {
    TreeElement
  },
  metaInfo: {
    title: 'Preview',
  },
  methods: {
    handle(e) {
      console.log(e)
      console.log('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
