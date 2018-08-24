/**
 * @flow
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { TermShow } from 'components/Term'

type Props = {
  match: Object
}

type State = {}

const SHOW_TERM_QUERY = gql`
  query showTerm {
    term(id: 1) {
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
    return (
      <Query query={SHOW_TERM_QUERY}>
        {({loading, data: { term }}) => {
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