/**
 * @flow
 */
import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { TermType, SamplePhraseType } from 'types'
import PropTypes from 'prop-types'
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

type Props = {
  termId: null | string | number,
  onPreviewQuestion: Function
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

/**
 * This component is a good sample of usecase for PureComponent. The parent
 * state change, but not related to the component -> it should not be re-rendered
 */
class PreviewContainer extends PureComponent<Props, *> {
  static propTypes = {
    termId: PropTypes.string,
    onPreviewQuestion: PropTypes.func.isRequired
  }

  renderQueriedPreviewComponent: Function

  constructor (props: *) {
    super(props)
    this.renderQueriedPreviewComponent = this.renderQueriedPreviewComponent.bind(this)
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
    console.log({term, answers, samplePhrase})

    return (
      <PreviewComponent
        term={normalizedTerm}
        samplePhrase={samplePhrase}
        answers={answers}
        onPreviewQuestion={this.props.onPreviewQuestion}
      />
    )
  }
}

export default PreviewContainer