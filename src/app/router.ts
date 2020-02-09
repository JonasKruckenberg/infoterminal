import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home.vue'
import Display from '@/pages/Display.vue'
import Control from '@/pages/Control.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Setup',
      component: Home
    },
    {
      path: '/display',
      name: 'Display',
      component: Display
    },
    {
      path: '/control',
      name: 'Control',
      component: Control
    }
  ]
})
