<template lang="">
  <div class="preview" :style="{backgroundImage: `url(${preview})`}">
    <h2>{{ title }}</h2>
    <router-link :to="{ name: 'Map', params: {} }" class="coordinates">
      <img svg-inline class="icon" src="@/assets/location-map.svg" alt="example" />
      <span>{{ coordinates[0] }} / {{ coordinates[1] }}</span>
    </router-link>
    <p>{{ description }}</p>
  </div>
</template>

<script>
import LocationIcon from '@/assets/location-map.svg'
export default {
  name: 'Preview',
  meta: {
    title: 'Categories'
  },
  props: [
    'title',
    'description',
    'coordinates',
    'preview'
  ]
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';
.preview {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: $white;
  border-radius: .6rem;
  flex-grow: 1;
  margin: 1rem;
  padding: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba($black,0.6);
  background-blend-mode: darken;
  h2 {
    margin-bottom: 1rem;
  }
  .coordinates {
    font-size: 1.25rem;
    .icon {
      width: 1.7rem;
      height: 1.7rem;
      margin: 0 .75rem;
      margin-left: 0;
    }
    color: $white;
    margin-left: 1rem;
    margin-bottom: .5rem;
  }
  p {
    font-size: 1.2rem;
  }
}
</style>
