/**
 * @flow
 */
import React, { Component } from 'react'
import type { Node } from 'react'
import type { TermType } from 'types'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { TermShow } from 'components/Term'

type Props = {
  match: Object
}

type State = {}

type QueryResult = {
  loading: boolean,
  data: {
    term: TermType
  }
}

const SHOW_TERM_QUERY = gql`
  query showTerm($id: ID!) {
    term(id: $id) {
      id
      term
      reading
      meaning
      samplePhrases(limit: 2) {
        phrase
      }
    }
  }
`
class TermShowContainer extends Component<Props, State> {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render () {
    const { id }:{ id: number } = this.props.match.params;

    return (
      <Query query={SHOW_TERM_QUERY} variables={{ id }}>
        {({loading, data: { term }}: QueryResult): Node => {
          if (loading) return <h2>Loading ...</h2>
          return (
            <TermShow term={term} />
          )
        }}
      </Query>
    )
  }
}

export default TermShowContainer