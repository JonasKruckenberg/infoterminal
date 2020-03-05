<template lang="html">
  <router-link :to="{ name: 'Admin-ImportWizard', query: { name, path } }" class="drive">
    <h3>{{ name }}</h3>
    <span>Ort: {{ path }}</span>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Drive extends Vue {
  @Prop()
  path: string
  @Prop()
  name: string
}
</script>

<style lang="scss" scoped>
@import '@/variables.scss';
.drive {
  text-decoration: none;
  display: inline-flex;
  flex-direction: column;
  align-self: flex-start;
  padding: .6em;
  border-radius: $rounding;
  color: $white;
  background-color: darken($black, 2);
}
</style>
