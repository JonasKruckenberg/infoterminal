<template lang="html">
  <div class="page">
    <div class="menu">
      <h1>Karte</h1>
    </div>
    <div id="map"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from "vue-property-decorator";
import mapbox, { Map, LngLatBounds } from "mapbox-gl";
mapbox.accessToken =
  "pk.eyJ1Ijoiam9uYXNrcnVja2VuYmVyZzIiLCJhIjoiY2s2c2UycnFpMGN1aDNtcDl6Z2JjcnNsayJ9.w4oUkVVydE_oi_LrK7iZrA";

@Component
export default class MapDisplay extends Vue {
  @Prop({ default: "Karte" })
  path: string;

  map: Map;
  bounds = new LngLatBounds([6.638462, 53.020733, 8.428334, 53.845359]);

  mounted() {
    this.map = new Map({
      container: "map",
      style: "mapbox://styles/jonaskruckenberg2/ck6sec7mr1vnj1in0os1e3dm5",
      center: [7.345853, 53.457426],
      zoom: 12,
      maxZoom: 17,
      minZoom: 10,
      maxBounds: this.bounds
    });
  }

  async fetchData() {}
}
// import { Component, Prop, Vue } from 'vue-property-decorator'

// import mapboxgl from 'mapbox-gl'
// mapboxgl.accessToken =
//   'pk.eyJ1Ijoiam9uYXNrcnVja2VuYmVyZzIiLCJhIjoiY2s2c2UycnFpMGN1aDNtcDl6Z2JjcnNsayJ9.w4oUkVVydE_oi_LrK7iZrA'

// import 'mapbox-gl/dist/mapbox-gl.css'

// @Component
// export default class Map extends Vue {
//   @Prop(Number)
//   lat: number
//   @Prop(Number)
//   long: number

//   mounted() {
//     // TODO: Use this to log all the intercations users had with markers on the map
//     //this.$analytics.logEvent('view_item',{ items: ['Map Selection Preview']})

//     const
//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/jonaskruckenberg2/ck6sec7mr1vnj1in0os1e3dm5',
//       center: [this.long || 7.345853, this.lat || 53.457426],
//       zoom: 12,
//       maxZoom: 17,
//       minZoom: 10,
//       maxBounds: bounds,
//     })
//   }
// }
//
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
