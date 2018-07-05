import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as constants from './constants'

const db = firebaseApp.database()
const seminerRef = db.ref('seminers/')
const participateSeminerRef = db.ref('participateSeminers/')

export const seminersModule = {
  namespaced: true,
  state: {
    seminers: {},
    participateSeminers: {}
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
      const currentUserId = context.rootState.currentUserId
      console.log(currentUserId, value, context)
      const addUserRef = participateSeminerRef.child(currentUserId).child(value)
      addUserRef.set(1)
    }),
    [constants.GET_SEMINERS]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('seminers', seminerRef, { wait: true })
    }),
    [constants.GET_PRTICIPATE_SEMINERS]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('participateSeminers', participateSeminerRef, { wait: true })
    })
  },
  getters: {
    getSeminers: state => state.seminers,
    getParticipateSeminers: state => state.participateSeminers
  }
}
