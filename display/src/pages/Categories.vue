<template>
  <div class="page">
    <div class="header">
      <BackButton v-if="id" />
      <h2 v-if="title">{{ title }}</h2>
      <div
        v-if="description"
        class="description scrollbar"
        v-html="description"
      ></div>
    </div>
    <div class="categories scrollbar">
      <div class="spacer"></div>
      <Category
        v-for="category in categories"
        :key="category.title"
        :parent="title"
        :title="category.title"
        :description="category.description"
        :thumbnail="category.thumbnail"
        :type="category.__typename"
      />
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { request, gql, GraphQLClient } from "graphql-request";
import Category from "../components/Category.vue";
import BackButton from "../components/BackButton.vue";

const client = new GraphQLClient("http://localhost:3001/graphql");

export default {
  components: { Category, BackButton },
  inject: ["playback"],
  props: {
    id: String,
  },
  setup(props, ctx) {
    const categories = ref([]);
    const title = ref("");
    const description = ref("");

    onMounted(async () => {
      if (props.id) {
        const query = gql`
          {
            category(id: "Category:${props.id}") {
              title
              description
              children {
                __typename
                ... on MediaResource {
                  title
                  thumbnail
                }
              }
            }
          }
        `;
        const res = await client.request(query);
        categories.value = res.category.children;
        title.value = res.category.title;
        description.value = res.category.description;
      } else {
        const query = gql`
          {
            categories {
              __typename
              title
              thumbnail
            }
          }
        `;
        const res = await client.request(query);
        categories.value = res.categories;
      }
    });

    return { categories, title, description };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";
.header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: fixed;
  width: 100vw;
  .description {
    max-height: 14vh;
    display: block;
    white-space: initial;
    overflow-y: auto;
  }
}
.categories {
  max-height: 100vh;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scroll-margin: 0;
  overflow-x: scroll;
  overflow-y: hidden;
}
.spacer {
  display: inline-block;
  width: 55vh;
  height: 60vh;
  margin: 1rem;
}
</style>
