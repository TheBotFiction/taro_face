import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import NewComponent from 'components/Conversation/New'
import SelectCharacterContainer from './SelectCharacter'

export class ConversationNewContainer extends Component {
  static propTypes = {

  }

  render () {
    const selectCharacterSlot = (<SelectCharacterContainer />)
    return (
      <NewComponent
        selectCharacterSlot={selectCharacterSlot}
      />
    )
  }
}

export default ConversationNewContainer
