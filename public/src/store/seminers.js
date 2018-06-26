import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as Constants from './constants'

const db = firebaseApp.database()
const SeminerRef = db.ref('seminers/')

export const seminersModule = {
  namespaced: true,
  mutations: {
    ...firebaseMutations
  },
  actions: {
    // setters
    [Constants.SET_NEW_SEMINER]: firebaseAction((context, value) => {
      const currentUserId = context.rootState.currentUserId
      const SeminerRegistRef = SeminerRef.child(currentUserId).push()
      SeminerRegistRef.set(value)
    })
  }
}
