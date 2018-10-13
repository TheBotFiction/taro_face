import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import NewComponent from 'components/Conversation/New'
import SelectCharacterContainer from './SelectCharacter'

const CREATE_CONVERSATION = gql`
  mutation createConversation($messages: [MessageInputObject!]!, $title: String, $description: String) {
    createConversation(messages: $messages, title: $title, description: $description) {
      conversation {
        id
        title
        messages {
          id
          characterId
          content
        }
      }
    }
  }
`

export class ConversationNewContainer extends Component {
  static propTypes = {
    onCreateConversation: PropTypes.func.isRequired
  }

  render () {
    const selectCharacterSlot = (props) => <SelectCharacterContainer {...props} />
    return (
      <NewComponent
        selectCharacterSlot={selectCharacterSlot}
        onCreateConversation={this.props.onCreateConversation}
      />
    )
  }
}

const MutableConversationNewContainer = (props) => (
  <Mutation mutation={CREATE_CONVERSATION}>
    {(createConversation, { data }) => {
      const _onCreateConversation = (payload) => {
        console.log(payload)
        createConversation({variables: payload})
      }
      return (
        <ConversationNewContainer
          {...props}
          onCreateConversation={_onCreateConversation}
        />
      )
    }}
  </Mutation>
)

export default MutableConversationNewContainer