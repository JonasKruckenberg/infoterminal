<template>
	<div class="page">
		<div id="map"></div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import mapbox, { Map, LngLatBoundsLike } from 'mapbox-gl';
import { log } from 'util';
const { ipcRenderer } = window;

mapbox.accessToken =
	'pk.eyJ1Ijoiam9uYXNrcnVja2VuYmVyZzIiLCJhIjoiY2s2c2UycnFpMGN1aDNtcDl6Z2JjcnNsayJ9.w4oUkVVydE_oi_LrK7iZrA';

@Component
export default class InteractiveMap extends Vue {
	@Prop()
	path: string;
	data: any = null;
	map: Map = null;

	bounds: LngLatBoundsLike = [
		[6.638462, 53.020733],
		[8.428334, 53.845359]
	];

	blacklist = ['type', 'thumbnail', 'description', 'coordinates'];

	async mounted() {
		this.map = new Map({
			container: 'map',
			style: 'mapbox://styles/jonaskruckenberg2/ck6sec7mr1vnj1in0os1e3dm5',
			// style: 'mapbox://styles/mapbox/light-v10',
			center: [7.33673, 53.44892],
			zoom: 12,
			maxZoom: 17,
			minZoom: 10,
			maxBounds: this.bounds
		});

		this.data = await ipcRenderer.invoke('media.get', this.path || '');

		for (const name in this.subcategories) {
			const marker = this.subcategories[name];
			const el = document.createElement('div');
			el.className = 'marker';
			el.style.backgroundImage = `url(${marker.thumbnail || ''})`;
			new mapbox.Marker(el)
				.setLngLat({ lat: marker.lat, lng: marker.lng })
				.setPopup(
					new mapbox.Popup({
						closeButton: false,
						closeOnMove: true,
						offset: 25,
						maxWidth: 'none'
					}).setHTML(`<h3>${name}</h3>`)
				)
				.addTo(this.map);
		}
	}

	get subcategories() {
		if (this.data.type !== 'map') return [];
		const out: { [title: string]: any } = {};
		for (const name in this.data) {
			if (!this.blacklist.includes(name)) {
				out[name] = this.data[name];
			}
		}
		return out;
	}
}
</script>

<style>
body,
.page {
	margin: 0;
	padding: 0;
}

#map {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
}
.marker {
	background-color: red;
	/* background-image: url('mapbox-icon.png'); */
	background-size: cover;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	cursor: pointer;
}
.mapboxgl-popup {
	/* max-width: 'none'; */
}

.mapboxgl-popup-content {
	text-align: center;
	* {
		color: black;
	}
}
</style>
