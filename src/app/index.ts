import Vue from 'vue'
import App from './App.vue'

import router from './plugins/router'

import '@/assets/master.scss'

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
})
