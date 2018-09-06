/**
 * @flow
 */

import React, { Component } from 'react'
import type { PaperSheetType$ChosenQuestion } from 'types'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import ChosenQuestionItem from '../Chosen/ChosenQuestionItem'

type Props = {
  onPreviewQuestion: Function
} & PaperSheetType$ChosenQuestion

class PreviewComponent extends Component<Props, {| |}> {
  static propTypes = {
    term: PropTypes.object.isRequired,
    answers: PropTypes.array.isRequired,
    samplePhrase: PropTypes.object.isRequired,
    onPreviewQuestion: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { term, answers, samplePhrase }: PaperSheetType$ChosenQuestion = this.props
    // Notice to the PaperSheetNewContainer about previewing item
    this.props.onPreviewQuestion({
      term,
      answers,
      samplePhrase
    })
  }

  render () {
    const { term, answers, samplePhrase }: Props = this.props

    return (
      <Grid container spacing={16} direction="column">
        <ChosenQuestionItem isPreviewing term={term} answers={answers} samplePhrase={samplePhrase} />
      </Grid>
    )
  }
}

export default PreviewComponent