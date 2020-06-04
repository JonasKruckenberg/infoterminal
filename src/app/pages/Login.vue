<template>
	<div class="page">
		<h2>Anmelden</h2>
		<form @submit.prevent="login">
			<label for="password">Passwort</label>
			<input type="password" id="password" v-model="password" />
			<span class="error">{{ error }}</span>
			<button type="submit" class="button">Login</button>
		</form>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
const { ipcRenderer } = window;

@Component
export default class Login extends Vue {
	@Prop()
	from: string;
	@Prop()
	to: string;

	password: string = '';
	error: string = '';

	async login() {
		if (await ipcRenderer.invoke('main.authorize', this.password)) {
			this.error = '';
			window.sessionStorage.setItem('isadminmode', true);
			this.$router.push({ name: this.to });
		} else {
			this.error = 'Falsches Passwort';
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
.error {
	color: $red;
}
.page {
	display: grid;
	grid-template-rows: 10vh 1fr;
	grid-template-columns: 1fr 60vw 1fr;
	h2 {
		grid-column: 2;
	}
	form {
		grid-row: 2;
		grid-column: 2;
		display: flex;
		flex-direction: column;
		padding: 5em;
		label {
			margin: 0.6em;
		}
		input {
			background: $white;
			border: none;
			font-size: 1.2em;
			padding: 0.6rem;
			margin: 0.6em;
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
