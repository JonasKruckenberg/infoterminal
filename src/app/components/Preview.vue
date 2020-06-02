<template>
	<div class="preview" :data-background-image="preview">
		<h2>{{ title }}</h2>
		<router-link :to="{ name: 'Map' }" class="coordinates" v-if="coordinates">
			<img svg-inline class="icon" src="@/assets/icons/location-map.svg" alt="example" />
			<span>{{ coordinates.lat }} / {{ coordinates.long }}</span>
		</router-link>
		<p>{{ description }}</p>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import lozad from 'lozad'

	@Component
	export default class Preview extends Vue {
		name: 'Preview'
		meta: {
			title: 'Categories'
		}
		@Prop(String)
		title: string
		@Prop(String)
		description: string
		@Prop(Object)
		coordinates: { lat: number; long: number }
		@Prop(String)
		preview: string
		@Prop(String)
		previewMime: string

		mounted() {
			const observer = lozad(this.$el)
			observer.observe()
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/variables.scss';
	.preview {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		color: $white;
		border-radius: 0.6rem;
		flex-grow: 1;
		margin: 1rem;
		padding: 1rem;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-color: rgba($black, 0.6);
		background-blend-mode: darken;

		filter: blur(3px);
		transition: filter 200ms;
		&[data-loaded='true'] {
			filter: none;
		}

		h2 {
			margin-bottom: 1rem;
		}
		.coordinates {
			align-self: flex-start;
			align-items: center;
			display: inline-flex;
			font-size: 1.25rem;
			background-color: $highlight;
			color: $white;
			padding: 0.5rem 1.6rem;
			border-radius: 0.6rem;
			.icon {
				width: 1.7rem;
				height: 1.7rem;
				margin: 0 0.75rem;
				margin-left: 0;
			}
			margin-left: 1rem;
			margin-bottom: 0.5rem;
		}
		p {
			font-size: 1.2rem;
		}
	}
</style>
