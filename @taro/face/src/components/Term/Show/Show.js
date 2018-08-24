/**
 * @flow
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import type { TermType } from 'types'

type Props = {
  term: TermType
}
type State = {}

class TermShow extends Component<Props, State> {
  static propTypes = {
    term: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        <h1>TermShow here</h1>
        <p>
          <textarea
            rows="40"
            cols="80"
            readOnly
            value={JSON.stringify(this.props.term, null, 2)}
          />
        </p>
      </div>
    )
  }
}

export default TermShow;