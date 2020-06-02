<template>
	<div class="media">
		<input type="radio" name="tree-nodes" :id="'radiobutton-' + title" @click="$emit('select')" />
		<label :for="'radiobutton-' + title" :data-background-image="preview">
			<h3>{{ title }}</h3>
		</label>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import lozad from 'lozad'

	@Component
	export default class TreeNode extends Vue {
		@Prop()
		title: string
		@Prop()
		preview: string

		mounted() {
			const observer = lozad(this.$el.children[1])
			observer.observe()
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/variables.scss';
	.media {
		display: flex;
		scroll-snap-align: center;
		position: relative;
		color: $white;
		min-width: 10rem;
		min-height: 10rem;
		max-width: 15rem;
		margin: 1.5rem;
		& input:checked ~ label {
			box-shadow: $shadow-hover;
			transform: scale(1.2);
		}
		label {
			display: flex;
			flex-grow: 1;
			flex-direction: column-reverse;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			background-color: rgba($black, 0.5);
			background-blend-mode: darken;
			border-radius: 0.6rem;
			transition: transform 150ms;
			text-align: center;
			font-size: 1.1em;
			padding: 0 0.5rem;

			// This is responsible for the animation on lazy loading the image
			filter: blur(3px);
			transition: filter 200ms;
			&[data-loaded='true'] {
				filter: none;
			}
		}
		input {
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: 0;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
	}
</style>
