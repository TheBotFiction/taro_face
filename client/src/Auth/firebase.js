import firebase from 'firebase/app'
import 'firebase/auth'

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyCoIfpUCKUmhJ5pA9-yaYljmmBfC0SaPWU',
  authDomain: 'ums-auth-kit.firebaseapp.com',
  projectId: 'ums-auth-kit'
}

firebase.initializeApp(config)

export default firebase