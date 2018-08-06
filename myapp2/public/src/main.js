// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Croppa from 'vue-croppa'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(Croppa)

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyDJJJJVWc-GqEQSD4X1a8wYjdTHreOSttU',
  authDomain: 'myapp2-b32b4.firebaseapp.com',
  databaseURL: 'https://myapp2-b32b4.firebaseio.com',
  projectId: 'myapp2-b32b4',
  storageBucket: '',
  messagingSenderId: '55488749381'
}
// initialize firebase
const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

// const Refs
const setNewCommentRef = db.ref('/comment')
const currentUserRef = (currentUserId) => {
  return db.ref('users/' + currentUserId)
}
const setUsreEmailRef = (currentUserId) => {
  return db.ref('users/' + currentUserId + '/userEmail')
}

// const
const SET_NEW_COMMENT = 'SET_NEW_COMMENT'
const SET_USER_EMAIL = 'SET_USER_EMAIL'

// plugin setup (dispatch)
const myplugins = store => {
  store.dispatch(SET_NEW_COMMENT)
  store.dispatch(SET_USER_EMAIL)
}

const store = new Vuex.Store({
  state: {
    comments: {}
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    // setters
    [SET_NEW_COMMENT]: firebaseAction((context, value) => {
      setNewCommentRef.push(value)
    }),
    [SET_USER_EMAIL]: firebaseAction((context, value) => {
      setUserEmailRef(context.rootState.currentUserId).set(value)
    })

  },
  getters: {
    getComments: state => state.comments
  },
  plugins: [myplugins]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
