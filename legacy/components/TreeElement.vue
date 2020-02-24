<template lang="html">
  <div class="tree-element">
    <router-link :to="{ name: 'Preview', params: { previewName: name, previewDescription: description }}"
      v-if="preview">
      <h2>{{ name }}</h2>
    </router-link>
    <h2 v-if="!preview">{{ name }}</h2>
    <div class="children">
      <tree-element v-if="children"
        v-for="child in children" :key="child.key"
        :name="child.name"
        :description="child.description"
        :preview="child.type == 'media' "
        :children="child.children"></tree-element>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-element',
  props: [
    'name',
    'description',
    'preview',
    'children'
  ]
}
</script>

<style lang="scss" scoped>
.children {
  margin-left: 1rem;
}
</style>
