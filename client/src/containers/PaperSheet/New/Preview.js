import React, { Component } from 'react'
import type { Node } from 'react'
import _ from 'lodash'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { PreviewComponent } from 'components/PaperSheet/New'

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
  chooseQuestion: Function
  renderQueriedPreviewComponent: Function

  constructor (props) {
    super(props)
    this.chooseQuestion = this.chooseQuestion.bind(this)
    this.renderQueriedPreviewComponent = this.renderQueriedPreviewComponent.bind(this)
  }

  // getDerivedStateFromProps (props, state): * {
  //   const { term }: { term: TermType } = props
  //   const samplePhrase: SamplePhraseType | void = _.sample(term.samplePhrases)
  //   return {
  //     term: {
  //       id: term.id,
  //       term: term.term
  //     },
  //     similars: term.similars,
  //     samplePhrase
  //   }
  // }

  chooseQuestion (payload): void {
    console.log(payload)
  }

  render () {
    const { termId } = this.props
    if (!termId) return null

    return (
      <Query query={SHOW_TERM_QUERY} variables={{ id: termId }}>
        { this.renderQueriedPreviewComponent }
      </Query>
    )
  }

  renderQueriedPreviewComponent ({loading, data}: QueryResult): Node {
    if (loading) return <h2>Loading ...</h2>
    if (!data) return null

    const { term }: { term: TermType } = data
    const samplePhrase: SamplePhraseType | void = _.sample(term.samplePhrases)

    if (!samplePhrase) return null

    const normalizedTerm: TermType = { id: term.id, term: term.term }
    const similars: Array<TermType> = term.similars
    const answers: Array<TermType> = _.shuffle([ term, ...similars ])

    return (
      <PreviewComponent
        term={normalizedTerm}
        samplePhrase={samplePhrase}
        answers={answers}
        chooseQuestion={this.chooseQuestion}
      />
    )
  }
}

export default PreviewContainer