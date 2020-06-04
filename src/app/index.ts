import Vue from 'vue';
import App from './App.vue';

import router from './plugins/router';

import './assets/master.scss';

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
