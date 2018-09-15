import AuthContext from './AuthContext'
import AuthProvider from './AuthProvider'
import firebase from './firebase'
import ProtectedRoute from './ProtectedRoute'

const AuthConsumer = AuthContext.Consumer

export {
  firebase,
  AuthConsumer,
  AuthProvider,
  ProtectedRoute
}