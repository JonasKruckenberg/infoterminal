<template lang="html">
  <div class="preview" :style="`background-image: url(${ $route.query.image })`">
    <div class="type" v-if="$route.query.type == 'video'">Video</div>
    <div class="type" v-if="$route.query.type == 'foto'">Foto</div>
    <h2>{{ $route.query.title }}</h2>
    <div class="description">{{ $route.query.description }}</div>
  </div>
</template>

<script>
export default {
  data() {
    console.log(this.$route.query);
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';
.preview {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-color: rgba($black,0.6);
  background-blend-mode: darken;
  color: $white;
  padding: 1.5rem;
  h2 {
    font-size: 3em;
  }
  div {
    margin: 1em;
  }
  .description {
    font-size: 1.2em;
  }
}
</style>
