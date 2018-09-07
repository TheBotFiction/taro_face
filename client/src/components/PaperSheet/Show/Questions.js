/**
 * @flow
 */
import React, { Fragment } from 'react'
import type { Node } from 'react'
import type { QuestionType } from 'types'
import PropTypes from 'prop-types'
import Question from './Question'

type Props = {
  questions: Array<QuestionType>
}

const Questions: Function = ({ questions }: Props): Node => (
  <Fragment>
    {questions.map((question: QuestionType, index: number): Node => (
      <Question {...question} key={index} />
    ))}
  </Fragment>
)

Questions.propTypes = {
  questions: PropTypes.array.isRequired
}

export default Questions
