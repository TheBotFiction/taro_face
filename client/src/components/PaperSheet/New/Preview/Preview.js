import React, { Component } from 'react'

class PreviewComponent extends Component {
  render () {
    return <p>{JSON.stringify(this.props.term)}</p>
  }
}

export default PreviewComponent