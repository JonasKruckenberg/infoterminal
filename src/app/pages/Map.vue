<template lang="html">
  <div class="page">
    <div class="menu">
      <img svg-inline
        class="icon"
        src="@/assets/angle-left.svg"
        alt="example"
        @click="$router.push('/')"/>
      <h1>Karte</h1>
    </div>
    <div id="map">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXNrcnVja2VuYmVyZzIiLCJhIjoiY2s2c2UycnFpMGN1aDNtcDl6Z2JjcnNsayJ9.w4oUkVVydE_oi_LrK7iZrA'

import 'mapbox-gl/dist/mapbox-gl.css'
@Component({
  metaInfo: {
    title: 'Map Preview',
  }
})
export default class Map extends Vue {
  @Prop(Number)
  lat:number
  @Prop(Number)
  long:number

  mounted() {
    // TODO: Use this to log all the intercations users had with markers on the map
    //this.$analytics.logEvent('view_item',{ items: ['Map Selection Preview']})

    const bounds = [
      [ 6.638462, 53.020733 ],
      [ 8.428334, 53.845359 ]
    ]
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jonaskruckenberg2/ck6sec7mr1vnj1in0os1e3dm5',
      center: [ this.long || 7.345853, this.lat || 53.457426 ],
      zoom: 12,
      maxZoom: 17,
      minZoom: 10,
      maxBounds: bounds
    })
    map.on('load', () => {
      const p1 = map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', ( err, image ) => {
        if (err) return this.$analytics.logEvent('exception',{ description: err.toString() })
        map.addImage('cat', image)
        map.addSource('point', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [ 7.345853, 53.457426 ]
                }
              }
            ]
          }
        })
        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'point',
          'layout': {
            'icon-image': 'cat',
            'icon-size': 0.15
          }
        })
      })
    })
  }
}
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
