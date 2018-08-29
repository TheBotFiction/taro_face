/**
 * @flow
 */

import React, { Component, Fragment } from 'react'
import type { Node } from 'react'
import type { TermType, PaperSheetType$ChosenQuestion } from 'types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import NewComponent from 'components/PaperSheet/New'
import PreviewContainer from './Preview'
import ChosenContainer from './Chosen'

type Props = {| |}
type State = {
  selectedTermId: null | number,
  chosenQuestions: Array<PaperSheetType$ChosenQuestion>
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
  onChooseQuestion: Function

  constructor (props: Props) {
    super(props)

    this.onSelectTerm = this.onSelectTerm.bind(this)
    this.onChooseQuestion = this.onChooseQuestion.bind(this)
  }

  state = {
    selectedTermId: null,
    chosenQuestions: []
  }

  onSelectTerm (termId: number): void {
    this.setState({selectedTermId: termId})
  }

  onChooseQuestion (payload: Object): void {
    console.log(payload)
    this.setState({
      chosenQuestions: [
        ...this.state.chosenQuestions,
        payload
      ],
      selectedTermId: null
    })
  }

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

    const { selectedTermId, chosenQuestions }: State = this.state
    const previewSlot: Node = (
      <PreviewContainer
        termId={selectedTermId}
        onChooseQuestion={this.onChooseQuestion}
      />
    )

    const chosenSlot: Node = <ChosenContainer questions={chosenQuestions} />

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
          chosenSlot={chosenSlot}
        />
      </Fragment>
    )
  }
}

export default NewContainer