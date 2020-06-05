<template>
  <div class="page">
    <BackButton />
    <h1>Settings</h1>
    <div class="sidebar">
      <router-link to="/settings/shutdown">
        <img svg-inline class="icon" src="../assets/icons/power-off-solid.svg" />Ausschalten
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    BackButton: () => import("../components/back.vue")
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.page {
  margin: 3rem;
  display: grid;
  grid-template-columns: 20vw 1fr;
  grid-template-rows: 10vh 1fr;
  .back-button {
    grid-column: 1;
    grid-row: 1;
  }
  h1 {
    grid-column: 2;
    grid-row: 1;
  }
  .sidebar {
    grid-column: 1;
    grid-row: 2;
    background-color: #484850;
    padding: 1rem;
    a {
      display: inline-flex;
      align-items: center;
    }
  }
  .page {
    grid-column: 2;
    grid-row: 2;
    margin: 0;
  }
}
</style>
