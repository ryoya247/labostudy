import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as constants from './constants'
import { profilesModule } from './profiles'
import { seminersModule } from './seminers'
import { peoplesModule } from './peoples'

const db = firebaseApp.database()

Vue.use(Vuex)

const currentUserRef = (currentUserId) => { return db.ref('users/' + currentUserId) }

const myplugins = store => {
  firebaseApp.auth().onAuthStateChanged(function (user) {
    console.log('in myPlugins', user)
    if (user) {
      store.dispatch(constants.GET_USER_INFO, user.uid)

      let dispatchHeader = 'seminers/'
      store.dispatch(dispatchHeader + constants.GET_SEMINERS)
      store.dispatch(dispatchHeader + constants.GET_PRTICIPATE_SEMINERS)
      store.dispatch(dispatchHeader + constants.GET_CURRENT_MY_SEMINERS)

      dispatchHeader = 'peoples/'
      store.dispatch(dispatchHeader + constants.GET_USERS)
    }
  })
}
const store = new Vuex.Store({
  modules: {
    profiles: profilesModule,
    seminers: seminersModule,
    peoples: peoplesModule
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
    destroySession (state) {
      console.log('destroySession::', state)
      console.log(Object.keys(state))
      state.currentUserId = ''
      state.currentUser = {}
      console.log('destroyedSession::', state)
    },
    setUser (state, user) {
      console.log('setUser in mutations', user)
      state.authUser = user
      if (user) {
        state.currentUserId = user.uid
        console.log('Auth:1', state.currentUser)
      } else {
        state.currentUserId = null
        console.log('Auth:0', user)
      }
    }
  },
  actions: {
    destroySession (context) {
      context.commit('destroySession')
    },
    initUser (context) {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        console.log('onAuthStateChanged:', user)
        context.commit('setUser', user)
      })
    },
    [constants.GET_USER_INFO]: firebaseAction(({ bindFirebaseRef }, currentUserId) => {
      if (!currentUserId) currentUserId = '__GHOST_USER__'
      console.log(currentUserId)
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
