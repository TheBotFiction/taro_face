/**
 * @flow
 */

import React, { Component } from 'react'
import type { PaperSheetType$ChosenQuestion } from 'types'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Paper from '@material-ui/core/Paper'
import ChosenQuestionItem from '../Chosen/ChosenQuestionItem'

type Props = {
  classes: Object,
  onChooseQuestion: Function
} & PaperSheetType$ChosenQuestion

class PreviewComponent extends Component<Props, *> {
  static propTypes = {
    term: PropTypes.object.isRequired,
    answers: PropTypes.array.isRequired,
    samplePhrase: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onChooseQuestion: PropTypes.func.isRequired
  }

  onChooseQuestion: Function

  constructor (props: Props) {
    super(props)
    this.onChooseQuestion = this.onChooseQuestion.bind(this)
  }

  onChooseQuestion (): void {
    const { term, answers, samplePhrase }: PaperSheetType$ChosenQuestion = this.props
    this.props.onChooseQuestion({
      term,
      answers,
      samplePhrase
    })
  }

  render () {
    const { term, answers, samplePhrase, classes }: Props = this.props

    return (
      <Paper className={classes.root}>
        <Grid container spacing={16} direction="column">
          <ChosenQuestionItem term={term} answers={answers} samplePhrase={samplePhrase} />
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              onClick={this.onChooseQuestion}
            >
              Add To Paper Sheet
              <CloudUploadIcon className={classes.rightIcon} />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

const styles: Function = (theme): Object => ({
  root: {
    // display: 'flex',
    // alignItems: 'start',
    // justifyContent: 'space-around'
  },
  button: {
    // margin: theme.spacing.unit,
  },
  buttonContainer: {
    textAlign: 'center'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  }
})

export default withStyles(styles)(PreviewComponent)