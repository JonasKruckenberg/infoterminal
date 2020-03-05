import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home.vue'
import Display from '@/pages/Display.vue'
import Map from '@/pages/Map.vue'
import Category from '@/pages/Category.vue'
import Login from '@/pages/Login.vue'

import Dashboard from '@/pages/Dashboard.vue'
import DashboardDefault from '@/pages/dashboard/Overview.vue'
import Import from '@/pages/dashboard/Import.vue'
import ImportWizard from '@/pages/dashboard/Import-wizard.vue'
import Settings from '@/pages/dashboard/Settings.vue'

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
      path: '/login',
      name: 'Login',
      component: Login,
      props: (route) => ({
        ...route.query
      })
    },
    {
      path: '/admin',
      component: Dashboard,
      beforeEnter: ( to, from, next ) => {
        if ( window.sessionStorage.getItem('isadminmode') ) {
          next()
        } else {
          console.log('not logged in!')
          next({ name: 'Login', query: { refferer: from.name, to: to.name }})
        }
      },
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
          path: 'import/wizard',
          name: 'Admin-ImportWizard',
          component: ImportWizard,
          props: (route) => ({
            ...route.query
          })
        },
        {
          path: 'settings',
          name: 'Admin-Settings',
          component: Settings
        }
      ]
    }
  ]
})
