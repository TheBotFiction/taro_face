import React, { Component } from 'react'
import type { Node } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { PreviewComponent, } from 'components/PaperSheet/New'

type QueryResult = {
  loading: boolean,
  data: {
    term: TermType
  } | void
}

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
      similars {
        id
        term
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
        {this.renderQueriedPreviewComponent}
      </Query>
    )
  }

  renderQueriedPreviewComponent ({loading, data}: QueryResult): Node {
    if (loading) return <h2>Loading ...</h2>
    if (!data) return null
    return (
      <PreviewComponent term={data.term} />
    )
  }
}

export default PreviewContainer