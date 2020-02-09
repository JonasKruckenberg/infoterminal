<template lang="html">
  <div class="page" v-if="menuItems">
    <menuItem v-for="menu in menuItems.folders"
      :key="menu.name"
      :title="menu.name"
      :icon="menu.icon"
      ></menuItem>
  </div>
</template>

<script lang="ts">
import { remote } from 'electron'
import menuItem from '@/components/menuitem.vue'

export default {
  components: {
    menuItem
  },
  data() {
    return {
      menuItems: null
    }
  },
  created() {
    document.title = 'Control'
  },
  async mounted() {
    const getMedia = remote.getGlobal('getMedia')
    this.menuItems = await getMedia()
  }
}
</script>

<style lang="scss" scoped>
</style>
