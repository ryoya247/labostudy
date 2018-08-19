import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store/store'
import firebaseApp from './../firebase_setup'
import BootstrapVue from 'bootstrap-vue'
import Croppa from 'vue-croppa'
import VueSweetalert2 from 'vue-sweetalert2'
import FullCalendar from 'vue-full-calendar'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-croppa/dist/vue-croppa.css'
import 'fullcalendar/dist/fullcalendar.min.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(Croppa)
Vue.use(VueSweetalert2)
Vue.use(FullCalendar)

Vue.config.productionTip = false
Vue.prototype.$firebase = firebaseApp

export const db = firebaseApp.database()
export const storage = firebaseApp.storage()

sync(store, router)
console.log('mainjs:: initUser')
store.dispatch('initUser')

let app
firebaseApp.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      mounted () {
        console.log('Vue mounted.')
        console.log('store.state', store.state)
      },
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
    })
  }
  console.log('onAuthStateChanged[main.js]', user)
})
