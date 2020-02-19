<template lang="html">
  <div class="page">
    <div class="categories" v-if="categories" @scroll="checkEl" ref="scroll">
      <div class="spacer"></div>
      <div class="spacer"></div>
      <Category v-for="( category, index ) in categories"
      :key="index"
      :image="category.image"
      :name="category.name"></Category>
      <div class="spacer"></div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { remote } from 'electron'
import Category from '@/components/Category.vue'
import mapPreview from '@/assets/mapPreview.png'

function rem2pix(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
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
      categories: [
        { image: mapPreview, name: 'Karte' },
        { image: `https://picsum.photos/975/975?sig=${Math.floor(Math.random() * 100)}`, name: 'Kategorie 2' },
        { image: `https://picsum.photos/975/975?sig=${Math.floor(Math.random() * 100)}`, name: 'Kategorie 3' },
        { image: `https://picsum.photos/975/975?sig=${Math.floor(Math.random() * 100)}`, name: 'Kategorie 4' },
        { image: `https://picsum.photos/975/975?sig=${Math.floor(Math.random() * 100)}`, name: 'Kategorie 5' }
      ]
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
  padding: 2rem 0;
  &::-webkit-scrollbar {
    display: none;
  }
}
.spacer {
  width: 9rem * 2.5;
  height: 13rem * 2.5;
  margin: 1rem;
  flex-shrink: 0;
}
</style>
