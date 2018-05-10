import firebase from 'firebase'
import firebaseConfig from './config/firebase_config'

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
