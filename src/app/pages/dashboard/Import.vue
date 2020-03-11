<template lang="html">
  <div class="page">
    <h1>Importieren</h1>
    <button type="button" class="button" @click="getDrives">check</button>
    <Drive v-for="drive in drives" :key="drive" :path="drive" name="Test Device" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import Drive from '@/components/Drive.vue'

@Component({
  components: {
    Drive
  }
})
export default class Import extends Vue {
  drives: Array<string> = []
  created() {
    this.getDrives()
  }
  async getDrives() {
    this.drives = await ipcRenderer.invoke('check-drives')
  }
}
</script>

<style lang="scss" scoped>
@import '@/variables.scss';
.button {
  background-color: $primary;
}
</style>
