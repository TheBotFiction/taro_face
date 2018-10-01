import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from './AuthContext'

export class ProtectedRoute extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired
  }

  render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        component={(props) => (
          <AuthContext.Consumer>
            {({currentUser, authLoaded}) => {
              if (authLoaded && !currentUser) {
                return <Redirect to="/" />
              }
              if (!authLoaded) {
                return 'Authenticating...'
              }
              return <Component {...props} />
            }}
          </AuthContext.Consumer>
        )}
      />
    )
  }
}

export default ProtectedRoute
