
import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as Constants from './constants'
const db = firebaseApp.database()
const setEmailRegistRef = (currentUserId) => { return db.ref('users/' + currentUserId + '/userInfo/userEmail') }
const setProfileRegistRef = (currentUserId) => { return db.ref('users/' + currentUserId + '/userInfo/userEmail') }
const setProfileRef = (currentUserId) => { return db.ref('users/' + currentUserId + '/userInfo') }

export const profilesModule = {
  namespaced: true,
  mutations: {
    ...firebaseMutations
  },
  actions: {
    // setters
    [Constants.SET_DEFAULT_USER_INFO]: firebaseAction((context, value) => {
      setEmailRegistRef(context.rootState.currentUserId).set(value)
    }),
    [Constants.SET_NEW_PROFILE]: firebaseAction((context, value) => {
      setProfileRegistRef.set(value)
    }),
    [Constants.SET_PROFILE]: firebaseAction((context, value) => {
      setProfileRef(context.rootState.currentUserId).set(value)
    })
  }
}
