import React, { Component } from 'react'
import Context from './Context'

class PreviewComponent extends Component {
  render () {
    return (
      <Context.Consumer>
        {context => (
          <h1>{`Preview ${context}`}</h1>
        )}
      </Context.Consumer>
    )
  }
}

export default PreviewComponent