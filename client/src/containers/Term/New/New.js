import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
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

export class TermNewContainer extends Component {

  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onAnalyze = this.onAnalyze.bind(this)
  }

  state = {
    q: ''
  }

  onSubmit (e) {
    console.log(e)
  }

  onAnalyze (payload) {
    console.log(payload)
    this.setState({q: payload.samplePhrase})
  }

  render() {
    const { q } = this.state
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

export default TermNewContainer
