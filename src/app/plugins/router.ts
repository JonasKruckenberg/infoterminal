import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Categories',
      path: '/categories/:path?',
      component: () => import('@/pages/Categories.vue'),
      props: true,
    },
    {
      name: 'Preview',
      path: '/preview/:path',
      component: () => import('@/pages/Preview.vue'),
      props: true,
    },
    {
      name: 'Display',
      path: '/display/:path?',
      component: () => import('@/pages/Display.vue'),
      props: true,
    },
    {
      name: 'Map',
      path: '/map/:path?',
      component: () => import('@/pages/Map.vue'),
      props: true,
    },
    {
      name: 'Settings',
      path: '/settings/:path?',
      component: () => import('@/pages/Settings.vue'),
      props: true,
    },
  ],
})
