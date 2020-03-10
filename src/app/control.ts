import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

import './master.scss'

import router from './router'
import App from './App.vue'


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

const firebaseConfig = {
  apiKey: 'AIzaSyCjzL2koY_yit6w1b7Aej-v4a3-r1f4IL4',
  authDomain: 'https://infoterminal-admin.firebaseapp.com',
  databaseURL: 'https://infoterminal-admin.firebaseio.com',
  projectId: 'infoterminal-admin',
  storageBucket: 'infoterminal-admin.appspot.com',
  messagingSenderId: '344105226301',
  appId: '1:344105226301:web:3e1895394bffb9b26fda54',
  measurementId: 'G-V7HJEWNTLS'
}
firebase.initializeApp(firebaseConfig)
firebase.analytics()
.logEvent("App started")

declare global {
    interface Window { $analytics: any; }
}

window.$analytics = firebase.analytics()
Vue.prototype.$analytics = firebase.analytics();