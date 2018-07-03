import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as constants from './constants'

const db = firebaseApp.database()
const seminerRef = db.ref('seminers/')

export const seminersModule = {
  namespaced: true,
  state: {
    seminers: {}
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    [constants.SET_NEW_SEMINER]: firebaseAction((context, value) => {
      // const currentUserId = context.rootState.currentUserId
      // const SeminerRegistRef = seminerRef.child(currentUserId).push()
      // SeminerRegistRef.set(value)
      const setSeminerRef = seminerRef.push()
      setSeminerRef.set(value)
    }),
    [constants.ADD_USER_TO_SEMINER]: firebaseAction((context, value) => {
      console.log(value)
    }),
    [constants.GET_SEMINERS]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('seminers', seminerRef, { wait: true })
    })
  },
  getters: {
    getSeminers: state => state.seminers
  }
}
