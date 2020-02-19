<template lang="html">
  <div class="page">
    <h1>Map</h1>
    <div id="map">
    </div>
  </div>
</template>

<script lang="ts">
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXNrcnVja2VuYmVyZzIiLCJhIjoiY2s2c2UycnFpMGN1aDNtcDl6Z2JjcnNsayJ9.w4oUkVVydE_oi_LrK7iZrA'

import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  mounted() {
    const bounds = [
      [ 6.638462, 53.020733 ],
      [ 8.428334, 53.845359 ]
    ]
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jonaskruckenberg2/ck6sec7mr1vnj1in0os1e3dm5',
      center: [7.345853, 53.457426],
      zoom: 12,
      maxBounds: bounds
    })
    map.on('load', function() {
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function(error, image) {
        if (error) throw error;
        map.addImage('cat', image);
        map.addSource('point', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [7.345853, 53.457426]
                }
              }
            ]
          }
        });
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
#map {
  width: 100%;
  height: 100%;
}
</style>
