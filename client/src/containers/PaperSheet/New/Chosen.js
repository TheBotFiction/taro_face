/**
 * @flow
 */
import React, { Component } from 'react'
import type { PaperSheetType$ChosenQuestion } from 'types'
import { ChosenComponent } from 'components/PaperSheet/New'

type Props = {
  questions: Array<PaperSheetType$ChosenQuestion>
}

class ChosenContainer extends Component<Props, *> {
  render () {
    const { questions }: Props = this.props
    if (!questions) return null

    return <ChosenComponent questions={questions} />
  }
}

export default ChosenContainer