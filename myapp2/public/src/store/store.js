import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as getterConstants from './getterConstants'
import { profilesModule } from './profiles'

const db = firebaseApp.database()
Vue.use(Vuex)

const currentUserRef = (currentUserId) => { return db.ref('users/' + currentUserId) }

const myplugins = store => {
  firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.dispatch(getterConstants.GET_USER_INFO, user.uid)
    }
  })
}
const store = new Vuex.Store({
  modules: {
    profiles: profilesModule
  },
  state: {
    currentUserId: firebaseApp.auth().currentUser
      ? firebaseApp.auth().currentUser.uid
      : null,
    authUser: {},
    currentUser: {}
  },
  mutations: {
    ...firebaseMutations,
    setUser (state, user) {
      console.log('setUser:mutations', user)
      state.authUser = user
      if (user) {
        state.currentUserId = user.uid
        console.log('Auth:1', user, location.herf)
      } else {
        state.currentUserId = null
        console.log('Auth:0', user, location.herf)
      }
    }
  },
  actions: {
    initUser (context) {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        console.log('onAuthStateChanged:', user)
        context.commit('setUser', user)
      })
    },
    setUser (context, user) {
      console.log('setUser:actions', user)
      context.commit('setUser', user)
    },
    [getterConstants.GET_USER_INFO]: firebaseAction(({ bindFirebaseRef }, currentUserId) => {
      console.log('bind:getterConstants.GET_USER_INFO', currentUserId)
      if (!currentUserId) currentUserId = '__GHOST_USER__'
      bindFirebaseRef('currentUser', currentUserRef(currentUserId), { wait: true })
    })
  },
  getters: {
    getUserId: state => state.currentUserId,
    getCurrentUser: state => state.currentUser,
    getCurrentUserInfo: state => state.currentUser.userInfo
  },
  plugins: [myplugins]
})

export default store
