import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home.vue'
import Display from '@/pages/Display.vue'

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
      component: () => import('@/pages/Map.vue')
    },
    {
      path: '/category',
      name: 'Category',
      props: (route) => ({
        ...route.query
      }),
      component: () => import('@/pages/Category.vue')
    }
  ]
})
