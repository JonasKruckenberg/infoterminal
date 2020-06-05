import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import VueGtag from 'vue-gtag';

import './assets/master.scss';

Vue.use(
	VueGtag,
	{
		config: { id: 'G-V7HJEWNTLS' },
		appName: 'Nabu Infoterminal',
		pageTrackerScreenviewEnabled: true
	},
	router
);

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});

document.addEventListener('touchend', e => {
	if (e.targetTouches.length === 2) {
		console.log('should open settings');
		router.push('/settings');
	}
});
