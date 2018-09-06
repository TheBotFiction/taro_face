/**
 * @flow
 */

import React, { Component, Fragment } from 'react'
import type { Node } from 'react'
import type { TermType, PaperSheetType$ChosenQuestion } from 'types'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import NewComponent from 'components/PaperSheet/New'
import PreviewContainer from './Preview'
import ChosenContainer from './Chosen'

type Props = {
  onCreatePaperSheet: Function
}

type State = {
  selectedTermId: null | string | number,
  previewingQuestion: null | PaperSheetType$ChosenQuestion,
  chosenQuestions: Array<PaperSheetType$ChosenQuestion>
}

type QueryResult = {
  loading: boolean,
  data: {
    terms: Array<TermType> | void
  }
}

type QuestionInputObject = {
  term: string,
  phrase: string,
  answers: Array<string>
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

class PaperSheetNewContainer extends Component<Props, State> {
  static propTypes = {
    onCreatePaperSheet: PropTypes.func.isRequired
  }
  onSelectTerm: Function
  onChooseQuestion: Function
  onPreviewQuestion: Function
  onCreatePaperSheet: Function

  constructor (props: Props) {
    super(props)

    this.onSelectTerm = this.onSelectTerm.bind(this)
    this.onChooseQuestion = this.onChooseQuestion.bind(this)
    this.onPreviewQuestion = this.onPreviewQuestion.bind(this)
    this.onCreatePaperSheet = this.onCreatePaperSheet.bind(this)
  }

  state = {
    selectedTermId: null,
    previewingQuestion: null,
    chosenQuestions: []
  }

  onSelectTerm (termId: number): void {
    this.setState({selectedTermId: termId})
  }

  onPreviewQuestion (previewingQuestion: PaperSheetType$ChosenQuestion): void {
    this.setState({ previewingQuestion })
  }

  onChooseQuestion (): void {
    const {
      previewingQuestion
    }: {
      previewingQuestion: null | PaperSheetType$ChosenQuestion
    } = this.state

    if (previewingQuestion) {
      this.setState({
        chosenQuestions: [
          ...this.state.chosenQuestions,
          previewingQuestion
        ],
        selectedTermId: null,
        previewingQuestion: null
      })
    }
  }

  onCreatePaperSheet (e) {
    const {
      chosenQuestions
    }: {
      chosenQuestions: Array<PaperSheetType$ChosenQuestion>
    } = this.state
    if (!chosenQuestions) {
      return
    }

    let payload: Array<QuestionInputObject> = []
    chosenQuestions.forEach(question => {
      const singleQuestion: QuestionInputObject = {
        term: question.term.term,
        phrase: question.samplePhrase.phrase,
        answers: question.answers.map(a => a.term)
      }
      payload.push(singleQuestion)
    })

    this.props.onCreatePaperSheet(payload)
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

    const { selectedTermId, previewingQuestion, chosenQuestions }: State = this.state
    const hasPreview: boolean = !_.isEmpty(previewingQuestion)
    const hasQuestion: boolean = !_.isEmpty(chosenQuestions)

    const previewSlot: Node = (
      <PreviewContainer
        termId={selectedTermId}
        onPreviewQuestion={this.onPreviewQuestion}
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
          onChooseQuestion={this.onChooseQuestion}
          onSubmit={this.onCreatePaperSheet}
          hasPreview={hasPreview}
          hasQuestion={hasQuestion}
          previewSlot={previewSlot}
          chosenSlot={chosenSlot}
        />
      </Fragment>
    )
  }
}

const CREATE_PAPER_SHEET_MUTATION: string = gql`
mutation createPaperSheet($questions: [QuestionInputObject!]!) {
  createPaperSheet(questions: $questions) {
    paperSheet {
      id
    }
    code
    errors
  }
}
`

const MutablePaperSheetNewContainer: Function = (props: any): Node => (
  <Mutation mutation={CREATE_PAPER_SHEET_MUTATION}>
    {(createPaperSheet, { data }) => (
      <PaperSheetNewContainer
        onCreatePaperSheet={(payload: Array<QuestionInputObject>): void => {
          createPaperSheet({variables: {questions: payload}})
        }}
      />
    )}
  </Mutation>
)

export default MutablePaperSheetNewContainer