/**
 * @flow
 */
import React, { Component } from 'react'
import type { PaperSheetType, QuestionType } from 'types'
import PropTypes from 'prop-types'
import Questions from './Questions'

type Props = {
  data: PaperSheetType
}

export class PaperSheetShowComponent extends Component<Props, {| |}> {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render () {
    const { data }: { data: PaperSheetType } = this.props
    const { questions }: { questions: Array<QuestionType> } = data
    return (
      <Questions questions={questions} />
    )
  }
}

export default PaperSheetShowComponent
