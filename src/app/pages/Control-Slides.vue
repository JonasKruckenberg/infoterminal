<template lang="html">
  <div class="page">
    <div class="sidebar">
      <button @click="$router.push('/control')">back</button>
      <h1>{{ $route.params.name }}</h1>
      <div class="slides">
        <router-link :to="{ name: 'ControlSlidesPreview', query: { image: $route.query.image, title: slide.title, description: slide.description, type: slide.type } }" class="slide" v-for="slide in slides" :key="slide.title" @click="currentSlide = slide">
          <h2>{{ slide.title }}</h2>
        </router-link>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: null,
      slides: [
        { type: 'video', title: 'Video1', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
        { type: 'video', title: 'Video2', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        { type: 'video', title: 'Video3', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        { type: 'foto', title: 'Photo1', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        { type: 'foto', title: 'Photo2', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';
.page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.sidebar {
  width: 20vw;
  background-color: $black;
  color: $white;
  h1,h2 {
    user-select: none;
  }
  h2 {
    font-size: 2rem;
    cursor: pointer;
  }
  .slides {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .slide {
      text-decoration: none;
      text-align: center;
      justify-content: center;
      margin: 1em;
      padding: .5em;
    }
  }
}
.router-link-exact-active {
  outline: 2px solid $red;
}
.content {
  width: 80vw;
  height: 100vh;
}
</style>
