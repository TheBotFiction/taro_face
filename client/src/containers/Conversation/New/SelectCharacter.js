/**
 * @flow
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { SelectCharacterComponent } from 'components/Conversation/New'

export class SelectCharacterContainer extends Component<*, *> {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object
  }

  render () {
    const { data, loading }: { data: Object, loading: boolean } = this.props
    if (loading) return 'Loading...'
    if (!data) return null
    const { characters } = data
    return (
      <SelectCharacterComponent {...this.props} data={characters} />
    )
  }
}

const INDEX_CHARACTERS = gql`
  query indexCharacters {
    characters {
      id
      name
    }
  }
`

export default (props: any) => {
  return (
    <Query query={INDEX_CHARACTERS}>
      {({loading, data}) => (
        <SelectCharacterContainer
          {...props}
          loading={loading}
          data={data}
        />
      )}
    </Query>
  )
}
