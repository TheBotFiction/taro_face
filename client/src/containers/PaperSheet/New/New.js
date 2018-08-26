/**
 * @flow
 */

import React, { Component, Fragment } from 'react'
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
    term: TermType
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

const loadOptions = (suggestions) => {
  return (inputValue, callback) => {
    setTimeout(() => {
      const matchedSuggestions: Array<Object> = suggestions.filter((option): boolean => (
        option.label.toLowerCase().indexOf(inputValue) >= 0
      ))
      callback(matchedSuggestions)
    })
  }
}

class NewContainer extends Component<Props, State> {
  constructor (props) {
    super(props)

    this.onSelectTerm = this.onSelectTerm.bind(this)
  }

  state = {
    selectedTermId: null
  }

  onSelectTerm (termId: number): void {
    this.setState({selectedTermId: termId})
  }

  render () {
    return(
      <Query query={INDEX_TERM_QUERY}>
        {({loading, data: { terms }}: QueryResult): Node => {
          if (loading) return <h2>Loading ...</h2>
          const suggestions: Array<Object> = terms.map(term => ({value: term.id, label: term.term}))
          return (
            <Fragment>
              <NewComponent
                loadOptions={loadOptions(suggestions)}
                onSelectTerm={this.onSelectTerm}
              />
              <PreviewContainer termId={this.state.selectedTermId} />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default NewContainer