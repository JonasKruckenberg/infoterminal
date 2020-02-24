import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home.vue'
import Display from '@/pages/Display.vue'
import MapPage from '@/pages/Map.vue'
import Preview from '@/pages/Preview.vue'
import Category from '@/pages/Category.vue'
import NotFound from '@/pages/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/display',
      name: 'Display',
      component: Display
    },
    {
      path: '/map',
      name: 'Map',
      component: MapPage
    },
    {
      path: '/category/:name',
      name: 'Category',
      props: (route) => ({
        ...route.params
      }),
      component: Category,
      children: [
        {
          path: '/preview/:name',
          name: 'Preview',
          props: (route) => ({
            ...route.params
          }),
          component: Preview
        },
        {
          path: '*',
          name: 'PreviewDefault',
          component: NotFound
        },
      ]
    }
  ]
})
