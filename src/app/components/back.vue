<template>
	<img
		svg-inline
		class="icon"
		src="../assets/icons/angle-left.svg"
		alt="example"
		@click="$router.go(-1)"
	/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class BackButton extends Vue {}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
.icon {
	color: $white;
	opacity: 0.5;
}
</style>
