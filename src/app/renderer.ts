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
Vue.prototype.$analytics = firebase.analytics();

performance.mark('mark_a')

const storage = firebase.storage()
const ref = storage.ref('abstract-architectural-design-architecture-2439595.jpg')
ref.getDownloadURL()
.then(async url => {
  const image = await fetch(url)
  console.log(await image.blob())
  performance.measure("measure a to now", 'mark_a')
  console.log(performance.getEntriesByType("measure"))
})
