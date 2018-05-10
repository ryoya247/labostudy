// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store/store'
import firebaseApp from './../firebase_setup'
import BootstrapVue from 'bootstrap-vue'
import Croppa from 'vue-croppa'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(Croppa)

Vue.config.productionTip = false

Vue.prototype.$firebase = firebaseApp
export const db = firebaseApp.database()

sync(store, router)
store.dispatch('initUser')

let app
firebaseApp.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
    })
  }
  console.log('main.js:onAuthStateChanged', user, app)
})
