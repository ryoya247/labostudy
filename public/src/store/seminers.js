import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as constants from './constants'

const db = firebaseApp.database()
const seminerRef = db.ref('seminers/')
const mySeminersRef = (currentUserId, seminerKey) => {
  return db.ref('mySeminers/' + currentUserId + '/' + seminerKey)
}
const participateSeminerRef = db.ref('participateSeminers/')
const currentMySeminersRef = db.ref('mySeminers/')

export const seminersModule = {
  namespaced: true,
  state: {
    seminers: {},
    participateSeminers: {},
    mySeminers: {}
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
      const setMySeminersRef = mySeminersRef(context.rootState.currentUserId, setSeminerRef.getKey())
      setMySeminersRef.set(1)
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
    }),
    [constants.GET_CURRENT_MY_SEMINERS]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('mySeminers', currentMySeminersRef, { wait: true })
    })
  },
  getters: {
    getSeminers: state => state.seminers,
    getMySeminers: state => state.currentMySeminers,
    getSeminersById: (state, getters, rootState) => (itemId) => {
      let mySeminers = {}
      if (state.participateSeminers[rootState.currentUserId]) {
        for (let seminerId in state.participateSeminers[rootState.currentUserId]) {
          if (itemId === seminerId) {
            mySeminers[seminerId] = state.seminers[seminerId]
          }
        }
      } else if (itemId === 'noseminers') {
        return {'noseminers': 'noseminers'}
      }
      return mySeminers
    },
    getParticipateSeminers: (state, getters, rootState) => {
      const stateParticipateSeminers = state.participateSeminers
      if (stateParticipateSeminers[rootState.currentUserId]) {
        return stateParticipateSeminers[rootState.currentUserId]
      } else {
        return {'noseminers': 'noseminers'}
      }
    },
    getCurrentMyseminers: (state, getters, rootState) => (currentUserId) => {
      // return用オブジェクト定義
      let returnMySeminers = {}

      const seminers = state.seminers
      const stateMySeminsers = state.mySeminers

      if (stateMySeminsers[currentUserId]) {
        for (let seminerId in stateMySeminsers[currentUserId]) {
          if (seminers[seminerId]) {
            returnMySeminers[seminerId] = seminers[seminerId]
          }
        }
      }

      return returnMySeminers
    }
  }
}
