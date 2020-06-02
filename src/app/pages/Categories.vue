<template>
  <div id="categories" class="page scrollbar" v-if="category">
    <div class="spacer"></div>
    <div class="spacer"></div>
    <Category
      v-for="(subcategory, title) in subcategories"
      :key="title"
      :parent="path"
      :type="subcategory.type"
      :title="title"
    />
    <div class="spacer"></div>
    <div class="spacer"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
const { ipcRenderer } = window;

@Component({
  components: {
    Category: () => import("@/components/Category.vue")
  }
})
export default class Categories extends Vue {
  /**
   * This is the path you're trying to access.
   * The format is in dot-notation, so the values can be easily fetched via electron storeor dot-prop
   */
  @Prop({ default: "" })
  path: string;
  /**
   * This list keeps a refecrence of all the keys in the category object that should not be rendered
   */
  blacklist = ["type", "thumbnail", "media", "description", "coordinates"];

  /**
   * The current category to display.
   */
  category: any = null;

  /**
   * This gets invoked everytime the route gets loaded.
   * It invokes the fetchData function to get the category object.
   */
  mounted() {
    this.fetchData();
  }
  /**
   * This watcher refetches the category data whenever the route changes, since the component gets reused.
   */
  @Watch("$route")

  /**
   * This function can be called to fetch the data from the electron store.
   * The fetched path the current path taken from the url, or null.
   */
  async fetchData() {
    this.category = await ipcRenderer.invoke("media.get", this.path || null);
  }

  /**
   * This computed property is a filtered version of the objk
   */
  get subcategories() {
    if (this.category.type !== "category") return [];
    const out: { [title: string]: any } = {};
    for (const name in this.category) {
      if (!this.blacklist.includes(name)) out[name] = this.category[name];
    }
    return out;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.header {
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  font-size: 2em;
  z-index: 1;
  align-items: center;
}
.warning {
  background-color: $warning;
}
.page {
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  // scroll-snap-type: x proximity;
  scroll-margin: 0;
}
.spacer {
  width: 9rem * 2.5;
  height: 13rem * 2.5;
  margin: 1rem;
  flex-shrink: 0;
}
.icon {
  width: 1em;
  height: 1em;
}
</style>
