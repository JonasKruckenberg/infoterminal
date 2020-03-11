<template lang="html">
  <div class="page">
    <h1>Importieren</h1>
    {{path}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ImportWizard extends Vue {
  @Prop()
  path: string
  @Prop()
  name: string
}
</script>

<style lang="scss" scoped>

</style>
