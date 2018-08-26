import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { PreviewComponent, } from 'components/PaperSheet/New'

const SHOW_TERM_QUERY = gql`
  query showTerm($id: ID!) {
    term(id: $id) {
      id
      term
      reading
      meaning
      samplePhrases(limit: 2) {
        id
        phrase
      }
    }
  }
`

class PreviewContainer extends Component {
  render () {
    const { termId } = this.props
    if (!termId) return null

    return (
      <Query query={SHOW_TERM_QUERY} variables={{ id: termId }}>
        {({loading, data: { term }}: QueryResult): Node => {
          if (loading) return <h2>Loading ...</h2>
          return (
            <PreviewComponent term={term} />
          )
        }}
      </Query>
    )
  }
}

export default PreviewContainer