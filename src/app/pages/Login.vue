<template lang="html">
  <div class="page">
    <div class="header">
      <img svg-inline
        class="icon"
        src="@/assets/angle-left.svg"
        alt="example"
        @click="$router.push('/')"/>
      <h1>Anmelden</h1>
    </div>
    <form @submit="handle">
      <label for="password">Passwort</label>
      <input type="password" id="password" v-model="password">
      <button type="submit" class="button">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  password: string = ''
  @Prop()
  refferer: string
  @Prop()
  to: string

  handle() {
    if (this.password === 'admin') {
      window.sessionStorage.setItem('isadminmode',true)
      this.$router.push({ name: this.to })
    } else {
      console.error('invalid password')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/variables.scss';
.page {
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  .header {
    margin-top: .8rem;
    left: 0;
    top: 0;
    position: absolute;
    color: $white;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      margin-right: 2em;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    width: 50vw;
    label {
      margin: .6em;
    }
    input {
      background: $white;
      border: none;
      font-size: 1.2em;
      padding: .6rem;
      margin: .6em;
      border-radius: $rounding;
    }
    .button {
      color: $white;
      font-size: 1.2em;
      padding: 1em;
      background-color: $primary;
    }
  }
}
</style>
