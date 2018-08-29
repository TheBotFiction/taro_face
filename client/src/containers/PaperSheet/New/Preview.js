/**
 * @flow
 */
import React, { Component } from 'react'
import type { Node } from 'react'
import type { TermType, SamplePhraseType, PaperSheetType$ChosenQuestion } from 'types'
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

class PreviewContainer extends Component<*, *> {
  onChooseQuestion: Function
  renderQueriedPreviewComponent: Function

  constructor (props: *) {
    super(props)
    this.onChooseQuestion = this.onChooseQuestion.bind(this)
    this.renderQueriedPreviewComponent = this.renderQueriedPreviewComponent.bind(this)
  }

  onChooseQuestion (payload: PaperSheetType$ChosenQuestion): void {
    this.props.onChooseQuestion(payload)
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

  /**
   * @todo Instead of return null, return an error panel with message
   *
   * @param {QueryResult} {loading, data}
   * @returns {Node}
   * @memberof PreviewContainer
   */
  renderQueriedPreviewComponent ({loading, data}: QueryResult): Node {
    if (loading) return <h2>Loading ...</h2>
    if (!data) return null

    const { term }: { term: TermType } = data
    const samplePhrase: SamplePhraseType | void = _.sample(term.samplePhrases)
    if (!samplePhrase) return null

    const normalizedTerm: TermType = { id: term.id, term: term.term }
    const similars: Array<TermType> | void = term.similars
    if (!similars) return null

    const answers: Array<TermType> = _.shuffle([ term, ...similars ])

    return (
      <PreviewComponent
        term={normalizedTerm}
        samplePhrase={samplePhrase}
        answers={answers}
        onChooseQuestion={this.onChooseQuestion}
      />
    )
  }
}

export default PreviewContainer