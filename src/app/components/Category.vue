<template>
	<div class="category-wrapper">
		<router-link
			class="category"
			:data-background-image="thumbnail"
			:class="{ highlight: center }"
			:to="link"
		>
			<h2>{{ title }}</h2>
			<div class="wrapper">
				<span class="description" v-if="center" v-html="description"></span>
				<div class="button" type="button">Mehr erfahren</div>
			</div>
		</router-link>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Location } from 'vue-router';
import lozad from 'lozad';
import { threadId } from 'worker_threads';

@Component
export default class Category extends Vue {
	@Prop()
	parent: string;
	@Prop()
	title: string;
	@Prop({ default: 'media' })
	type: string;
	@Prop()
	thumbnail: string;
	@Prop()
	description: string;

	center: boolean = false;
	centerObserver: IntersectionObserver;

	mounted() {
		let options: IntersectionObserverInit = {
			root: null,
			rootMargin: `0px -${(document.body.clientWidth / 2 - 300).toFixed()}px`,
			threshold: 1
		};

		this.centerObserver = new IntersectionObserver(entries => {
			this.center = entries[0].isIntersecting;
		}, options);
		this.centerObserver.observe(this.$el);

		const observer = lozad(this.$el.children[0]);
		observer.observe();
	}
	destroyed() {
		this.centerObserver.disconnect();
	}

	get link() {
		const out: Location = { params: { path: '' } };
		if (this.type === 'category') out.name = 'Categories';
		if (this.type === 'map') out.name = 'Map';
		if (this.type === 'media') out.name = 'Preview';
		if (this.parent) out.params.path += this.parent + '.';
		out.params.path += this.title;
		return out;
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
.category-wrapper {
	scroll-snap-align: center;
	display: inline-block;
	width: 40vh;
	height: 60vh;
	padding: 1.5rem;
	transform: translateY(-37%);
	margin-top: 50vh;
	vertical-align: bottom;
}
.category {
	border-radius: $rounding;
	white-space: initial;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	flex-wrap: nowrap;
	width: 100%;
	height: 100%;
	transition: transform 200ms, background-color 200ms;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-color: rgba($black, 0.3);
	background-blend-mode: darken;
	background-image: url('../assets/placeholder.svg');
	text-align: center;
	text-decoration: none;
	overflow-y: auto;
	h2 {
		display: block;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		opacity: 0;
		transition: opacity 250ms;
		.button {
			text-decoration: underline;
			background-color: $primary;
			flex-grow: 1;
		}
	}
}
.highlight {
	transform: scale(1.1);
	background-color: rgba($black, 0.5);
	.wrapper {
		span {
			transform: scaleY(1);
		}
		opacity: 1;
	}
}
</style>
