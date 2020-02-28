<template lang="html">
  <div class="page">
    <div class="menu">
      <img svg-inline
        class="icon"
        src="@/assets/angle-left.svg"
        alt="example"
        @click="$router.push('/')"/>
      <h1>{{ title }}</h1>
    </div>
    <component :is="Preview"
      v-if="current"
      :key="current.id"
      :title="current.name"
      :description="current.description"
      :coordinates="current.coordinates"
      :preview="current.preview || current.url">
    </component>
    <PlaybackControl>
    </PlaybackControl>
    <div class="nav scrollbar" v-if="type == 'category'">
      <TreeNode v-for="( child, index ) in children" :key="index"
        :title="child.name"
        :url="child.preview || child.url"
        @click="handleClick(child)"></TreeNode>
    </div>
  </div>
</template>

<script>
import Preview from '@/components/Preview.vue'
import PlaybackControl from '@/components/PlaybackControl.vue'
import TreeNode from '@/components/TreeNode.vue'
export default {
  components: {
    Preview,
    PlaybackControl,
    TreeNode
  },
  props: [
    'id',
    'type',
    'title',
    'children',
    'preview',
    'url',
    'description',
    'coordinates'
  ],
  beforeRouteUpdate( to, from, next ) {
    console.log(from);
    console.log(to);
    next()
  },
  data() {
    return {
      current: {
        id: this.id,
        description: this.description,
        coordinates: this.coordinates,
        preview: this.preview || this.url
      }
    }
  },
  methods: {
    handleClick(el) {
      if ( el.type == 'category' ) {
        console.log(el)
        this.$router.push({ name:'Category', query: {
            title: el.name,
            description: el.description,
            coordinates: el.coordinates,
            preview: el.preview,
            url: el.url,
            children: el.elements,
            type: el.type }})
      } else {
        this.current = el
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';
.page {
  flex-direction: column;
  align-items: stretch;
}
.menu {
  margin-top: .6rem;
  color: $white;
  display: flex;
  flex-direction: row;
  position: absolute;
  opacity: .65;
  align-items: center;
  .icon {
    width: 3rem;
    height: 3rem;
    padding: .6rem;
    cursor: pointer;
  }
}
.nav {
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>
