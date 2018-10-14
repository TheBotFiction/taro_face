import firebase from 'firebase/app'
import 'firebase/auth'

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyAmdLMsw8NB93nSbXOsppg1PRMWKF9FMxU',
  authDomain: 'with-taro-dev.firebaseapp.com',
  projectId: 'with-taro-dev'
}

firebase.initializeApp(config)

export default firebase