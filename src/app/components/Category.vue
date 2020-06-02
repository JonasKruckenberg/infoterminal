<template></template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	export default class Category extends Vue {
		@Prop()
		title: string
		@Prop()
		thumbnail: string
		@Prop()
		children: string
	}
</script>

<style lang="scss" scoped></style>
