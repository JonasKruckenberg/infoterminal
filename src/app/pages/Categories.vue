<template>
	<div class="page" v-if="category">
		<div class="header">
			<BackButton v-if="path" />
			<h2 v-if="title">{{ title }}</h2>
			<div
				v-if="description"
				class="description scrollbar"
				v-html="description"
			></div>
		</div>

		<div class="categories scrollbar">
			<div class="spacer"></div>
			<Category
				v-for="(subcategory, title) in subcategories"
				:key="title"
				:parent="path"
				:type="subcategory.type"
				:thumbnail="subcategory.thumbnail"
				:description="subcategory.shortDescription"
				:title="title"
			/>
			<div class="spacer"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import marked from 'marked';
import DOMPurify from 'dompurify';
const { ipcRenderer } = window;

@Component({
	components: {
		Category: () => import('../components/Category.vue'),
		BackButton: () => import('../components/back.vue')
	}
})
export default class Categories extends Vue {
	/**
	 * This is the path you're trying to access.
	 * The format is in dot-notation, so the values can be easily fetched via electron storeor dot-prop
	 */
	@Prop({ default: '' })
	path: string;
	/**
	 * This list keeps a refecrence of all the keys in the category object that should not be rendered
	 */
	blacklist = [
		'type',
		'thumbnail',
		'media',
		'description',
		'shortDescription',
		'coordinates'
	];

	//   title: string = this.path.split(".").pop();
	category: any = null;
	description: string = '';

	/**
	 * This gets invoked everytime the route gets loaded.
	 * It invokes the fetchData function to get the category object.
	 */
	mounted() {
		this.fetchData();
	}

	/**
	 * This function can be called to fetch the data from the electron store.
	 * The fetched path the current path taken from the url, or null.
	 * The watcher refetches the category data whenever the route changes, since the component gets reused.
	 */
	@Watch('$route')
	async fetchData() {
		this.category = await ipcRenderer.invoke('media.get', this.path || null);
		this.description = DOMPurify.sanitize(
			marked(this.category.description || '')
		);
	}

	get title() {
		return this.path.split('.').pop();
	}
	/**
	 * This computed property is a filtered version of the objk
	 */
	get subcategories() {
		if (this.category.type !== 'category') return [];
		const out: { [title: string]: any } = {};
		for (const name in this.category) {
			if (!this.blacklist.includes(name)) {
				out[name] = this.category[name];
				out[name].description = DOMPurify.sanitize(
					marked(out[name].description || '')
				);
			}
		}
		return out;
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
.header {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	position: fixed;
	width: 100vw;
	.description {
		max-height: 14vh;
		display: block;
		white-space: initial;
		overflow-y: auto;
	}
}
.categories {
	max-height: 100vh;
	scroll-behavior: smooth;
	scroll-snap-type: x mandatory;
	scroll-margin: 0;
	overflow-x: scroll;
	overflow-y: hidden;
}
.spacer {
	display: inline-block;
	width: 55vh;
	height: 60vh;
	margin: 1rem;
}
</style>
