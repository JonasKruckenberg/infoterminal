<template>
	<div class="page" v-if="categories">
		<!-- <p v-for="category of Object.keys(categories)" :key="category">
			{{ category }}
		</p> -->
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	const { ipcRenderer } = window

	@Component({
		components: {
			Category: () => import('@/components/Category.vue')
		}
	})
	export default class ControlHome extends Vue {
		path = ''

		categories: any = null

		async mounted() {
			this.categories = await ipcRenderer.invoke('media.get')
			console.log(ipcRenderer.invoke('media.get', Object.keys(this.categories)[0]))
		}
	}
</script>

<style lang="scss" scoped></style>
