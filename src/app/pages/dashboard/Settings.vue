<template lang="html">
  <div class="page">
    <h1>Settings</h1>
    <div class="input-group">
      <input type="checkbox" id="enableAnalytics" v-model="analyticsEnabled">
      <label for="enableAnalytics">Google Analytics eingeschaltet</label>
    </div>
    <button type="button" class="button" @click="shutdown">
      <img svg-inline
        class="icon"
        src="@/assets/power-off-solid.svg"
        alt="example"/>
      Dieses Gerät ausschalten
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import execa from 'execa'

@Component
export default class Settings extends Vue {
  get analyticsEnabled() {
    return !window[`ga-disable-${this.$analytics.app.options.measurementId}`]
  }
  set analyticsEnabled(val) {
    window[`ga-disable-${this.$analytics.app.options.measurementId}`] = !val
  }
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
@import '@/variables.scss';
.page {
  padding: 0;
  h1 {
    margin-bottom: 1em;
  }
  input[type='checkbox'] {
    transform: scale(1.5);
    margin: 1.2em;
  }
}
.button {
  color: $white;
  background-color: $warning;
}
</style>
