import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home.vue'
import Display from '@/pages/Display.vue'
import Map from '@/pages/Map.vue'
import Category from '@/pages/Category.vue'

import Dashboard from '@/pages/Dashboard.vue'
import DashboardDefault from '@/pages/dashboard/Overview.vue'
import Import from '@/pages/dashboard/Import.vue'
import Settings from '@/pages/dashboard/Settings.vue'
import Shutdown from '@/pages/dashboard/Shutdown.vue'


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
      component: Map
    },
    {
      path: '/category',
      name: 'Category',
      props: (route) => ({
        ...route.query
      }),
      component: Category
    },
    {
      path: '/admin',
      component: Dashboard,
      children: [
        {
          path: '/',
          name: 'Admin-Dashboard',
          component: DashboardDefault
        },
        {
          path: 'import',
          name: 'Admin-Import',
          component: Import
        },
        {
          path: 'settings',
          name: 'Admin-Settings',
          component: Settings
        },
        {
          path: 'shutdown',
          name: 'Admin-Shutdown',
          component: Shutdown
        }
      ]
    }
  ]
})
