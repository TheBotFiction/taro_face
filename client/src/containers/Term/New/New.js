/**
 * @flow
 */
import React, { Component } from 'react'
import type { Node } from 'react'
import type { TermInputObject } from 'types'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { TermNewComponent } from 'components/Term'

const ANALYZE_PHRASE = gql`
  query analyzeTerm($q: String!) {
    analyzedTerms (q: $q) {
      term
      reading
      meaning
    }
  }
`

type Props = {
  onCreateTerms: Function
}
type State = {
  q: string
}

export class TermNewContainer extends Component<Props, State> {
  static propTypes = {
    onCreateTerms: PropTypes.func.isRequired
  }

  onSubmit: Function
  onAnalyze: Function

  constructor (props: Props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onAnalyze = this.onAnalyze.bind(this)
  }

  state = {
    q: ''
  }

  onSubmit (payload: {term: Array<Object>}) {
    console.log(payload)
    const terms: Array<TermInputObject> = []
    payload.term.forEach((term) => {
      const termAttributes: TermInputObject = {
        term: term.term,
        meaning: term.meaning,
        reading: term.reading
      }
      terms.push(termAttributes)
    })
    this.props.onCreateTerms(terms)
  }

  onAnalyze (payload: any) {
    console.log(payload)
    this.setState({q: payload.samplePhrase})
  }

  render() {
    const { q }: { q: string } = this.state
    return (
      <Query query={ANALYZE_PHRASE} variables={{ q }} skip={ q.length <= 0 }>
        {({data}) => (
          <TermNewComponent
            terms={data ? data.analyzedTerms : [{}]}
            onSubmit={this.onSubmit}
            onAnalyze={this.onAnalyze}
          />
        )}
      </Query>
    )
  }
}

const CREATE_TERMS_MUTATION = gql`
  mutation createTerms($terms: [TermInputObject!]!) {
    createTerms(terms: $terms) {
      errors
      code
      terms {
        id
        term
      }
    }
  }
`

const MutableTermNewContainer: Function = (props: any): Node => (
  <Mutation mutation={CREATE_TERMS_MUTATION}>
    {(createTerms: Function, { data }: { data: any }): Node => {
      const _onCreateTerms: Function = (
        payload: Array<TermInputObject>
      ): Node => {
        createTerms({variables: {terms: payload}})
      }
      return (
        <TermNewContainer
          {...props}
          onCreateTerms={_onCreateTerms}
        />
      )
    }}
  </Mutation>
)

export default MutableTermNewContainer
