/**
 * @flow
 */

import React, { Component, Fragment } from 'react'
import type { Node } from 'react'
import type { TermType } from 'types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import NewComponent from 'components/PaperSheet/New'
import PreviewContainer from './Preview'

type Props = {}
type State = {
  selectedTermId: null | number
}

type QueryResult = {
  loading: boolean,
  data: {
    terms: Array<TermType> | void
  }
}

const INDEX_TERM_QUERY = gql`
  query indexTerms {
    terms {
      id
      term
    }
  }
`

const loadOptions: Function = (suggestions): Function => {
  return (inputValue, callback): void => {
    const matchedSuggestions: Array<Object> = suggestions.filter((option): boolean => (
      option.label.toLowerCase().indexOf(inputValue) >= 0
    ))
    callback(matchedSuggestions)
  }
}

class NewContainer extends Component<Props, State> {
  onSelectTerm: Function

  constructor (props: Props) {
    super(props)

    this.onSelectTerm = this.onSelectTerm.bind(this)
  }

  state = {
    selectedTermId: null
  }

  onSelectTerm (termId: number): void {
    this.setState({selectedTermId: termId})
  }

  // onAddQuestion (term: TermType): void {

  // }

  render () {
    return(
      <Query query={INDEX_TERM_QUERY}>
        {(result: QueryResult): Node => (this.renderQueriedNewComponent(result))}
      </Query>
    )
  }

  renderQueriedNewComponent ({loading, data}: QueryResult): Node {
    if (loading) return <h2>Loading ...</h2>
    if (!data) return null

    const { selectedTermId } = this.state
    const previewSlot: Node = <PreviewContainer termId={selectedTermId} />

    let suggestions: Array<Object> = []
    if (data.terms) {
      suggestions = data.terms.map(term => ({value: term.id, label: term.term}))
    }
    return (
      <Fragment>
        <NewComponent
          loadOptions={loadOptions(suggestions)}
          onSelectTerm={this.onSelectTerm}
          previewSlot={previewSlot}
        />
      </Fragment>
    )
  }
}

export default NewContainer