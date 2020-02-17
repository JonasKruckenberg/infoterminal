import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home.vue'
import Display from '@/pages/Display.vue'
import Control from '@/pages/Control.vue'
import ControlSlides from '@/pages/Control-Slides.vue'
import ControlSlidesPreview from '@/pages/Control-Slides-Preview.vue'

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
    },
    {
      path: '/control/slides',
      name: 'ControlSlides',
      component: ControlSlides,
      props: true,
      children: [
        {
          path: '/control/slides/preview/:name',
          name: 'ControlSlidesPreview',
          component: ControlSlidesPreview,
          props: true
        }
      ]
    }
  ]
})
