<template>
	<div class="page">
		<BackButton />
		<h1>Settings</h1>
	</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
	components: {
		BackButton: () => import('../components/back.vue')
	}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped></style>
