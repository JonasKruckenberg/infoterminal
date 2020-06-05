<template>
  <div></div>
  <!-- <div class="may-marker" :data-background-image="thumbnail"></div> -->
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import mapbox, { Map } from "mapbox-gl";
import lozad from "lozad";

@Component
export default class MapMarker extends Vue {
  @Prop({ required: true })
  map: Map;
  @Prop({ default: "" })
  thumbnail: string;
  @Prop({ required: true })
  lng: number;
  @Prop({ required: true })
  lat: number;

  @Watch("map")
  add() {
    console.log("mounting");
    const el = document.createElement("div");
    el.className = "my-marker";

    new mapbox.Marker(el).setLngLat([7.33673, 53.44892]).addTo(this.map);
  }
  //   mounted() {
  //     //const observer = lozad(this.$el);
  //     //observer.observe();
  //   }
}
</script>

<style lang="scss" scoped>
.my-marker {
  background-color: red;
  /* background-image: url('mapbox-icon.png'); */
  /* background-size: cover; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
