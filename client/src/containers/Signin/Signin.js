import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthConsumer } from 'Auth'
import SigninComponent from 'components/Signin'

class SigninContainer extends PureComponent {
  render() {
    return (
      <AuthConsumer>
        {({currentUser, authLoaded}) => {
          if (authLoaded && currentUser) {
            return <Redirect to="/" />
          }
          return <SigninComponent />
        }}
      </AuthConsumer>
    )
  }
}

export default SigninContainer
