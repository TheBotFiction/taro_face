import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AuthContext from './AuthContext'
import firebase from './firebase'
import PageLoading from 'components/UIKit/PageLoading'

class AuthProvider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.element
    ]).isRequired
  }

  state = {
    currentUser: firebase.auth().currentUser,
    authLoaded: false
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ currentUser: user, authLoaded: true })
    })
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
        <PageLoading variant="auth" open={!this.state.authLoaded} />
      </AuthContext.Provider>
    )
  }
}

export default AuthProvider
