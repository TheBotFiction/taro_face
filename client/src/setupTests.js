/* @flow */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import { firebase } from 'Auth'

class LocalStorageMock {
  store = {}

  clear (): void {
    this.store = {}
  }

  getItem (key: string): string | null {
    return this.store[key] || null
  }

  setItem (key: string, value: string): void {
    this.store[key] = value
  }

  removeItem (key: string): void {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()

// const onAuthStateChanged = jest.fn()
//
// const getRedirectResult = jest.fn(() => {
//   return Promise.resolve({
//     user: {
//       displayName: 'redirectResultTestDisplayName',
//       email: 'redirectTest@test.com',
//       emailVerified: true
//     }
//   })
// })
//
// const sendEmailVerification = jest.fn(() => {
//   return Promise.resolve('result of sendEmailVerification')
// })
//
// const sendPasswordResetEmail = jest.fn(() => Promise.resolve())
//
// const createUserWithEmailAndPassword = jest.fn(() => {
//   return Promise.resolve('result of createUserWithEmailAndPassword')
// })
//
// const signInWithEmailAndPassword = jest.fn(() => {
//   return Promise.resolve('result of signInWithEmailAndPassword')
// })
//
// const signInWithRedirect = jest.fn(() => {
//   return Promise.resolve('result of signInWithRedirect')
// })
//
// const initializeApp = jest
//   .spyOn(firebase, 'initializeApp')
//   .mockImplementation(() => {
//     return {
//       auth: () => {
//         return {
//           createUserWithEmailAndPassword,
//           signInWithEmailAndPassword,
//           currentUser: {
//             sendEmailVerification
//           },
//           signInWithRedirect
//         }
//       }
//     }
//   })
//
// jest.spyOn(firebase, 'auth').mockImplementation(() => ({
//   onAuthStateChanged,
//   currentUser: {
//     displayName: 'testDisplayName',
//     email: 'test@test.com',
//     emailVerified: true
//   },
//   getRedirectResult,
//   sendPasswordResetEmail
// }))
//
// firebase.auth.GoogleAuthProvider = jest.fn(() => {})

// https://github.com/facebook/react/issues/7371#issuecomment-317396864
// The ButtonBase use some kinds, maybe `ref' which cause jest to be failed
// $FlowFixMe
jest.mock('@material-ui/core/ButtonBase', () => 'MockedButtonBase')

configure({ adapter: new Adapter() })
