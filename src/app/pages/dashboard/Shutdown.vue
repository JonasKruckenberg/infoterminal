<template lang="html">
  <div class="page">
    <h1>Shutdown</h1>
    <button type="button" name="button" @click="shutdown">Shutdown</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import execa from 'execa'

@Component
export default class Shutdown extends Vue {
  async shutdown() {
    try {
      const { stdout } = await execa('shutdown -s -t 5')
      console.log(stdout)
      ipcRenderer.invoke('close-app')
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
