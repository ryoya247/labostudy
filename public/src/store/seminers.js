import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as Constants from './constants'

const db = firebaseApp.database()
const seminerRef = db.ref('seminers/')

export const seminersModule = {
  namespaced: true,
  mutations: {
    ...firebaseMutations
  },
  actions: {
    // setters
    [Constants.SET_NEW_SEMINER]: firebaseAction((context, value) => {
      const currentUserId = context.rootState.currentUserId
      const SeminerRegistRef = seminerRef.child(currentUserId).push()
      SeminerRegistRef.set(value)
    }),
    // getters
    [Constants.GET_SEMINERS]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('seminers', seminerRef, { wait: true })
    })
  }
}
