import React, { Component } from 'react'
import type { PaperSheetType } from 'types'
import PropTypes from 'prop-types'
import _ from 'lodash'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { PaperSheetShowComponent } from 'components/PaperSheet'

export class PaperSheetShowContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object
  }

  render() {
    const { data, loading }: { data: Object, loading: boolean } = this.props
    if (loading) return 'Loading...'
    const { paperSheet }: { paperSheet: PaperSheetType } = data
    return (
      <PaperSheetShowComponent data={paperSheet} />
    )
  }
}

const SHOW_PAPER_SHEET = gql`
  query showPaperSheet($id: ID!) {
    paperSheet(id: $id) {
      id
      questions {
        id
        term
        phrase
        answers
      }
    }
  }
`

export default (props: any) => {
  const id: number = _.get(props, 'match.params.id')
  if (!id) return null

  return (
    <Query query={SHOW_PAPER_SHEET} variables={{ id }}>
      {({loading, data}) => (
        <PaperSheetShowContainer
          {...props}
          loading={loading}
          data={data}
        />
      )}
    </Query>
  )
}
