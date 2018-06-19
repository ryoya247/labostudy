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
import VueSweetalert2 from 'vue-sweetalert2'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(Croppa)
Vue.use(VueSweetalert2)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDu1p6YN1MO9bMeTovk-wYwfJneUuu4qes',
    libraries: 'places'
  }
})

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
        console.log(store.state)
      },
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
      // methods: {
      //   croppaOnInit () {
      //     this.croppa.addClipPlugin(function (ctx, x, y, w, h) {
      //       /*
      //        * ctx: canvas context
      //        * x: start point (top-left corner) x coordination
      //        * y: start point (top-left corner) y coordination
      //        * w: croppa width
      //        * h: croppa height
      //       */
      //       console.log(x, y, w, h)
      //       ctx.beginPath()
      //       ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
      //       ctx.closePath()
      //     })
      //   }
      // }
    })
  }
  console.log('onAuthStateChanged[main.js]', user)
})
