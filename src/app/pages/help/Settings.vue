<template lang="html">
  <div class="page">
    <h3>Hilfe</h3>
    <h1>Einstellungen</h1>
    <router-link :to="{ name: 'Help' }" style="display: inline-flex; align-items: center; font-size: 1.1em;">
      <img svg-inline
      class="icon-small"
      src="@/assets/angle-left.svg"/>
      zurück
    </router-link>
    <div class="docs">
      <h2>Passwort</h2>
      <p>Hier lässt sich das Passwort ändern, das für den Zugriff auf das Adminterminal Benötigt wird.</p>
      <h2>Gerät ausschalten</h2>
      <p>Über diese Option lässt sich das Gerät herunterfahren.</p>
    </div>
  </div>
</template>
