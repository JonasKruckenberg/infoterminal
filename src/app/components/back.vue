<template>
	<img
		svg-inline
		class="icon"
		src="@/assets/icons/angle-left.svg"
		alt="example"
		@click="$router.go(-1)"
	/>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
export default class BackButton extends Vue {}
</script>

<style></style>
