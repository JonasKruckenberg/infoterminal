import Vue from 'vue'
import VueMeta from 'vue-meta'

import './master.scss'

Vue.use(VueMeta)

import App from './pages/Display.vue'


// const firebaseConfig = {
//   apiKey: 'AIzaSyCjzL2koY_yit6w1b7Aej-v4a3-r1f4IL4',
//   authDomain: 'https://infoterminal-admin.firebaseapp.com',
//   databaseURL: 'https://infoterminal-admin.firebaseio.com',
//   projectId: 'infoterminal-admin',
//   storageBucket: 'infoterminal-admin.appspot.com',
//   messagingSenderId: '344105226301',
//   appId: '1:344105226301:web:3e1895394bffb9b26fda54',
//   measurementId: 'G-V7HJEWNTLS'
// }

new Vue({
  el: '#app',
  render: h => h(App)
})
