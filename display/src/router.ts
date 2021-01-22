import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Categories',
      alias: ['/'],
      path: '/Category/:id(.*)',
      component: () => import('./pages/Categories.vue'),
      props: true
    },
    {
      name: 'Preview',
      path: '/MediaResource/:id(.*)',
      component: () => import('./pages/Preview.vue'),
      props: true
    },
    {
      name: 'Display',
      path: '/display',
      component: () => import('./pages/Display.vue'),
      props: true
    }
    // {
    //   name: 'Map',
    //   path: '/map/:path?',
    //   component: () => import('../pages/Map.vue'),
    //   props: true
    // }
    // {
    //   name: 'Login',
    //   path: '/login',
    //   component: () => import('../pages/Login.vue')
    // },
    // {
    //   name: 'Settings',
    //   path: '/settings',
    //   component: () => import('../pages/Settings.vue'),
    //   props: true,
    //   beforeEnter: (to, from, next) => {
    //     if (window.sessionStorage.getItem('isadminmode')) {
    //       next()
    //     } else {
    //       console.log('not logged in!')
    //       next({ name: 'Login', query: { refferer: from.name, to: to.name } })
    //     }
    //   },
    //   children: [
    //     {
    //       name: 'Settings.Shutdown',
    //       path: 'shutdown',
    //       component: () => import('../pages/Settings/Shutdown.vue')
    //     }
    //   ]
    // }
  ]
})
