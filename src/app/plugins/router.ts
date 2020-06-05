import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			name: 'Categories',
			path: '/categories/:path?',
			component: () => import('../pages/Categories.vue'),
			props: true
		},
		{
			name: 'Preview',
			path: '/preview/:path',
			component: () => import('../pages/Preview.vue'),
			props: true
		},
		{
			name: 'Display',
			path: '/display/:path?',
			component: () => import('../pages/Display.vue'),
			props: true
		},
		{
			name: 'Map',
			path: '/map/:path?',
			component: () => import('../pages/Map.vue'),
			props: true
		},
		{
			name: 'Login',
			path: '/login',
			component: () => import('../pages/Login.vue')
		},
		{
			name: 'Settings',
			path: '/settings',
			component: () => import('../pages/Settings.vue'),
			props: true,
			beforeEnter: (to, from, next) => {
				if (window.sessionStorage.getItem('isadminmode')) {
					next();
				} else {
					console.log('not logged in!');
					next({ name: 'Login', query: { refferer: from.name, to: to.name } });
				}
			},
			children: [
				{
					name: 'Settings.Shutdown',
					path: 'shutdown',
					component: () => import('../pages/Settings/Shutdown.vue')
				}
			]
		}
	]
});
