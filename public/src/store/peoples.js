import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as constants from './constants'

const db = firebaseApp.database()
const usersRef = db.ref('users')

export const peoplesModule = {
  namespaced: true,
  state: {
    users: {}
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    [constants.GET_USERS]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('users', usersRef, { wait: true })
    })
  },
  getters: {
    getUsers: state => state.users,
    getUserInfoByUserId: (state, getters, rootState) => (userId) => {
      const users = state.users
      return users[userId] ? users[userId].userInfo : {}
    }
  }
}
