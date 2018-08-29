/**
 * @flow
 */
import React, { Fragment } from 'react'
import type { Node } from 'react'
import type { PaperSheetType$ChosenQuestion } from 'types'
import ChosenQuestionItem from './ChosenQuestionItem'

type Props = {
  questions: Array<PaperSheetType$ChosenQuestion>
}

const ChosenComponent: Function = ({ questions }: Props): Node => (
  <Fragment>
    {questions.map((question: PaperSheetType$ChosenQuestion, index: number): Node => (
      <ChosenQuestionItem {...question} key={index} />
    ))}
  </Fragment>
)

export default ChosenComponent