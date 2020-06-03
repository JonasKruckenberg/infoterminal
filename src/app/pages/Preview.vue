<template>
	<div class="page">
		<div class="preview" :data-background-image="thumbnail">
			<h2>{{ title }}</h2>
			<span class="description" v-html="description"></span>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import marked from 'marked';
import DOMPurify from 'dompurify';
import lozad from 'lozad';
const { ipcRenderer } = window;

@Component
export default class Preview extends Vue {
	@Prop({ required: true })
	path: string;

	title: string = this.path.split('.').pop();
	description: string = '';
	thumbnail: string = '';

	async mounted() {
		await this.fetchData();
		const observer = lozad(this.$el.children[0]);
		observer.observe();
	}

	async fetchData() {
		const data = await ipcRenderer.invoke('media.get', this.path);
		this.description = DOMPurify.sanitize(marked(data.description || ''));
		this.thumbnail = data.thumbnail;
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
.page {
	padding: 10vh 5vw;
}
.preview {
	width: 100%;
	height: 100%;
	border-radius: $rounding;
	padding: 1rem;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-color: rgba($black, 0.6);
	background-blend-mode: darken;
	h2 {
		margin-bottom: 1rem;
	}
	.description {
		font-size: 1.2rem;
	}
}
</style>
