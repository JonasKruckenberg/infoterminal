<template lang="html">
  <div class="page">
    <h1>Hilfe</h1>
    <router-link :to="{ name: 'Help-General' }">Benutzung</router-link>
    <router-link :to="{ name: 'Help-Settings' }">Einstellungen</router-link>
    <router-link :to="{ name: 'Help-Import' }">Import</router-link>
    <router-link :to="{ name: 'Help-Usage' }">Nutzungsstatistiken</router-link>
  </div>
</template>
<style lang="scss" scoped>
  .page {
    padding: 0;
    h1 {
      margin-bottom: 1em;
    }
    a {
      font-size: 1.1em;
      margin: .75em;
    }
  }
</style>
