import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebaseApp from './../../firebase_setup'
import * as constants from './constants'

const db = firebaseApp.database()
const seminersRef = db.ref('seminers/')
const mySeminersRef = db.ref('mySeminers/')
const attendSeminersRef = db.ref('attendSeminers/')

const seminerAttendUsersRef = (seminerId) => {
  return db.ref('seminers/' + seminerId + '/attendUsers')
}
const currentMySeminersRef = (currentUserId, seminerId) => {
  return db.ref('mySeminers/' + currentUserId + '/' + seminerId)
}

export const seminersModule = {
  namespaced: true,
  state: {
    seminers: {},
    mySeminers: {},
    attendSeminers: {}
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    // 勉強会を新規登録した時の処理
    [constants.SET_NEW_SEMINER]: firebaseAction((context, value) => {
      const currentUserId = context.rootState.currentUserId
      const setSeminersRef = seminersRef.push()
      setSeminersRef.set(value)

      const setCurrentMySeminersRef = currentMySeminersRef(currentUserId, setSeminersRef.getKey())
      setCurrentMySeminersRef.set(1)
    }),
    // 勉強会に参加した時の処理
    [constants.ADD_USER_TO_SEMINER]: firebaseAction((context, value) => {
      const currentUserId = context.rootState.currentUserId
      const setAttendSeminersRef = attendSeminersRef.child(currentUserId).child(value)
      setAttendSeminersRef.set(1)
      const setSeminerAttendUsersRef = seminerAttendUsersRef(value).child(currentUserId)
      setSeminerAttendUsersRef.set(1)
    }),
    // 登録した自分が主催の勉強会を削除した時の処理
    [constants.REMOVE_MY_SEMINER]: firebaseAction((context, value) => {
      const currentUserId = context.rootState.currentUserId
      const removeSeminersRef = seminersRef.child(value)
      removeSeminersRef.remove()

      const removeMySeminersRef = currentMySeminersRef(currentUserId, value)
      removeMySeminersRef.remove()
    }),
    // Getters constants
    [constants.GET_SEMINERS]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('seminers', seminersRef, { wait: true })
    }),
    [constants.GET_ATTEND_SEMINERS]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('attendSeminers', attendSeminersRef, { wait: true })
    }),
    [constants.GET_CURRENT_MY_SEMINERS]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('mySeminers', mySeminersRef, { wait: true })
    })
  },
  getters: {
    getSeminers: state => state.seminers,
    getMySeminers: state => state.mySeminers,
    getAttendSeminers: state => state.attendSeminers,
    getSeminerBySeminerId: (state, getters, rootState) => (seminerId) => {
      const seminers = state.seminers
      console.log(seminers)
      if (seminers[seminerId]) {
        let seminer = seminers[seminerId]
        return seminer
      } else {
        return 'not exist seminer'
      }
    },
    getCurrentMyseminers: (state, getters, rootState) => (currentUserId) => {
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
