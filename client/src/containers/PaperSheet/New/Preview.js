import React, { Component } from 'react'
import { PreviewComponent, PreviewContext } from 'components/PaperSheet/New'

class PreviewContainer extends Component {
  state = {value: "XXX"}

  componentDidMount () {
    setTimeout(() => {
      this.setState({value: "AAAAAAA"})
    }, 2000)
  }

  render () {
    return (
      <PreviewContext.Provider value={this.state.value} >
        <PreviewComponent />
      </PreviewContext.Provider>
    )
  }
}

export default PreviewContainer