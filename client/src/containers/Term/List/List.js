/**
 * @flow
 */
import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { TermListItem } from 'types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { TermList } from 'components/Term'

type Props = { }

type State = {}

type QueryResult = {
  loading: boolean,
  data: {
    terms: TermListItem[]
  }
}

const INDEX_TERM_QUERY = gql`
  query indexTerm {
    terms {
      id
      term
      meaning
      samplePhrases {
        id
        phrase
      }
    }
  }
`
class TermListContainer extends PureComponent<Props, State> {
  render () {
    return (
      <Query query={INDEX_TERM_QUERY}>
        {({loading, data: { terms }}: QueryResult): Node => {
          if (loading) return <h2>Loading ...</h2>
          return (
            <TermList terms={terms} />
          )
        }}
      </Query>
    )
  }
}

export default TermListContainer
