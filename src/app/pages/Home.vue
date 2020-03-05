<template lang="html">
  <div class="page">
    <div class="header">
      <router-link :to="{ name: 'Admin-Dashboard' }">
        <img svg-inline
          class="icon"
          src="@/assets/cog-solid.svg"
          alt="example"/>
      </router-link>
    </div>
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
        :previewMime="category.previewMime"
        :children="category.elements"
        :index="index"></Category>

      <div class="spacer"></div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { checkIdle } from '@/util.ts'
import { remote } from 'electron'
import Category from '@/components/Category.vue'
import resolveTree from '@/resolveTree'
import { readJson, ensureDir } from 'fs-extra'
import { join } from 'path'

function rem2pix(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}
@Component({
  metaInfo: {
    title: 'Control',
  },
  components: {
    Category
  }
})
export default class Home extends Vue {
  categories: Array<TreeElement> = null

  created () {
    this.fetchData()
    // This creates a timeout that returns the app to its originial state after User inactivity
    checkIdle()
  }

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
  }

  async fetchData() {
    const config = remote.getGlobal('Config')
    await ensureDir(config.root)
    const main = await readJson(join(config.root,'package.json'))
    this.categories = await resolveTree(config.root, main.elemente,{})
  }
}
</script>

<style lang="scss" scoped>
@import '@/variables.scss';
.header {
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  font-size: 2em;
  z-index: 1;
  align-items: center;
}
.warning {
  background-color: $warning;
}
.page {
  flex-direction: row;
  align-items: center;
  align-items: stretch;
  padding: 0;
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
.icon {
  width: 1em;
  height: 1em;
}
</style>
