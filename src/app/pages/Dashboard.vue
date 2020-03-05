<template lang="html">
  <div class="page">
    <h1>Dashboard</h1>
    <div class="content">
      <div class="sidebar">
        <router-link :to="{ name: 'Admin-Dashboard' }">
          <img svg-inline
            class="icon"
            src="@/assets/user-friends-solid.svg"
            alt="example"/>
          Nutzung
        </router-link>
        <router-link :to="{ name: 'Admin-Settings' }">
          <img svg-inline
            class="icon"
            src="@/assets/tools-solid.svg"
            alt="example"/>
          Einstellungen
        </router-link>
        <router-link :to="{ name: 'Admin-Import' }">
          <img svg-inline
            class="icon"
            src="@/assets/file-import-solid.svg"
            alt="example"/>
          Importieren
        </router-link>
        <router-link :to="{ name: 'Home' }">Zurück</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  beforeRouteLeave( to, from, next ) {
    console.log('leaving route')
    window.sessionStorage.removeItem('isadminmode','false')
    next()
  }
})
export default class Dashboard extends Vue {

}
</script>

<style lang="scss" scoped>
 @import '@/variables.scss';
.content {
  display: flex;
  flex-direction: row;
  margin: 2em;
  a {
    text-align: center;
    font-size: 1.2em;
    text-decoration: none;
    color: $white;
    padding: .75em;
    margin: .5em 0;
    background-color: darken($black, 2);
  }
  div {
    margin: 1.5em;
  }
}
.sidebar {
  display: flex;
  flex-direction: column;
}
.icon {
  width: 2em;
  height: 2em;
}
</style>
