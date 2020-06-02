import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			name: 'Category',
			path: '/control/:path',
			component: () => import('@/pages/Control.vue'),
			props: true
		},
		{
			name: 'DisplayHome',
			path: '/display',
			component: () => import('@/pages/Display.vue'),
			props: true
		},
		{
			name: 'Display',
			path: '/display/:path',
			component: () => import('@/pages/Display.vue'),
			props: true
		},
		{
			name: 'Settings',
			path: '/settings',
			component: () => import('@/pages/Settings.vue'),
			props: true
		}
	]
})
