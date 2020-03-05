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
    <Preview v-if="current"
      :key="Math.random()"
      :title="current.name"
      :description="current.description"
      :coordinates="current.coordinates"
      :preview="current.preview || current.media"
      :mimeType="current.previewMime || current.mediaMime">
    </Preview>
    <PlaybackControl>
    </PlaybackControl>
    <div class="nav scrollbar" v-if="type == 'category'">
      <TreeNode v-for="( child, index ) in children" :key="title + child.name"
        :title="child.name"
        :preview="child.preview || child.media"
        :mimeType="child.previewMime || child.mediaMime"
        @select="handleClick(child, index)"></TreeNode>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import { remote, ipcRenderer } from 'electron'
import Preview from '@/components/Preview.vue'
import PlaybackControl from '@/components/PlaybackControl.vue'
import TreeNode from '@/components/TreeNode.vue'

const displayId = remote.getGlobal('displayId')

@Component({
  components: {
    Preview,
    PlaybackControl,
    TreeNode
  },
  metaInfo: {
    title: 'Category'
  }
})
export default class Category extends Vue {
  current = {
    key: Math.random() * 10000,
    name: this.title,
    description: this.description,
    coordinates: this.coordinates,
    preview: this.preview || this.url,
    mimeType: this.mimeType
  }
  @Prop()
  type: string
  @Prop()
  title: string
  @Prop()
  children: Array<TreeElement>
  @Prop()
  preview: string
  @Prop()
  previewMime: string
  @Prop()
  media: string
  @Prop()
  mediaMime: string
  @Prop()
  description: string
  @Prop()
  coordinates: string


  handleClick(el, index) {
    if ( el.type == 'category' ) {
      this.$router.push({
        name:'Category',
        query: {
          title: el.name,
          description: el.description,
          coordinates: el.coordinates,
          preview: el.preview,
          url: el.url,
          children: el.elements,
          type: el.type
        }
      })
    } else {
      this.current = el
      this.$analytics.logEvent('view_item',{ items: el.name })
      ipcRenderer.sendTo(displayId,'start',el.media)
    }
  }


  @Watch('$route')
  watchRoute() {
    this.current = {
      name: this.$route.query.title,
      description: this.$route.query.description,
      coordinates: this.$route.query.coordinates,
      preview: this.$route.query.preview || this.$route.query.url
    }
    this.$analytics.logEvent('view_item_list',{ items: this.current.name })
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
  margin-top: .8rem;
  color: $white;
  display: flex;
  flex-direction: row;
  position: absolute;
  opacity: .65;
  align-items: center;
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
