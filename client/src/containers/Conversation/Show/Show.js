/**
  * @flow
  */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import ShowComponent from 'components/Conversation/Show'

export class ConversationShowContainer extends Component<*, *> {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object
  }

  render () {
    const { data, loading }: { data: Object, loading: boolean } = this.props
    if (loading) return 'Loading...'
    if (!data) return null
    const { conversation, characters } = data
    return (
      <ShowComponent data={conversation} characters={characters} />
    )
  }
}

const SHOW_CONVERSATION = gql`
  query showConversation($id: ID!) {
    conversation(id: $id) {
      id
      title
      messages {
        id
        content
        characterId
      }
    }
    characters {
      id
      name
    }
  }
`

export default (props: any) => {
  const id: number = _.get(props, 'match.params.id')
  if (!id) return null

  return (
    <Query query={SHOW_CONVERSATION} variables={{ id }}>
      {({loading, data}) => (
        <ConversationShowContainer
          {...props}
          loading={loading}
          data={data}
        />
      )}
    </Query>
  )
}
