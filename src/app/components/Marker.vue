<template>
	<div class="marker" :data-background-image="thumbnail"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import mapbox, { Map } from 'mapbox-gl';
import lozad from 'lozad';

@Component
export default class MapMarker extends Vue {
	@Prop({ required: true })
	map: Map;
	@Prop({ default: '' })
	thumbnail: string;
	@Prop({ required: true })
	lon: number;
	@Prop({ required: true })
	lat: number;

	mounted() {
		console.log('mounting');

		new mapbox.Marker(this.$el as HTMLElement)
			.setLngLat({ lon: this.lon, lat: this.lat })
			.addTo(this.map);

		//const observer = lozad(this.$el);
		//observer.observe();
	}
}
</script>

<style lang="scss" scoped>
.marker {
	background-color: red;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	cursor: pointer;
}
</style>
