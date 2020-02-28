<template lang="html">
  <div class="page">
    <div class="categories scrollbar" v-if="categories" @scroll="checkEl" ref="scroll">
      <div class="spacer"></div>
      <div class="spacer"></div>

      <Category v-for="(category, index) in categories" :key="index"
        :id="category.id"
        :type="category.type"
        :title="category.name"
        :description="category.description"
        :coordinates="category.coordinates"
        :preview="category.preview"
        :children="category.elements"
        :index="index"></Category>

      <div class="spacer"></div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { remote } from 'electron'
import Category from '@/components/Category.vue'
import resolveTree from '@/resolveTree'
import { readJson, ensureDir } from 'fs-extra'
import { join } from 'path'

function rem2pix(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export default {
  metaInfo: {
    title: 'Control',
  },
  components: {
    Category
  },
  data() {
    return {
      categories: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    checkEl() {
      const center = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      const left = document.elementFromPoint(window.innerWidth / 2 - rem2pix(9 * 2.5), window.innerHeight / 2)
      const right = document.elementFromPoint(window.innerWidth / 2 + rem2pix(9 * 2.5), window.innerHeight / 2)

      if (center && center.classList.contains('category') && !center.classList.contains('highlight')) {
        center.classList.add('highlight')
      }
      if (left && left.classList.contains('highlight')) {
        left.classList.remove('highlight')
      }
      if (right && right.classList.contains('highlight')) {
        right.classList.remove('highlight')
      }
    },
    async fetchData() {
      const config = remote.getGlobal('Config')
      await ensureDir(config.root)
      const main = await readJson(join(config.root,'package.json'))
      this.categories = await resolveTree(config.root, main.elemente,{})
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  align-items: stretch;
}
.categories {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: center;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  width: 100%;
  margin-bottom: .6rem;
}
.spacer {
  width: 9rem * 2.5;
  height: 13rem * 2.5;
  margin: 1rem;
  flex-shrink: 0;
}
</style>
