import React, { Component } from 'react'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    state = {
      component: null
    }

    async componentDidMount () {
      const { default: component } = await importComponent()

      this.setState({
        component: component
      })
    }

    render () {
      const ImportedComponent = this.state.component
      if (!ImportedComponent) {
        return null
      }
      return <ImportedComponent {...this.props} />
    }
  }

  return AsyncComponent
}