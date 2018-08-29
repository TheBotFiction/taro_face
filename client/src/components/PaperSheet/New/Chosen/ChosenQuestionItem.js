/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import type { TermType, PaperSheetType$ChosenQuestion } from 'types'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import deepPurple from '@material-ui/core/colors/deepPurple'

type Props = {
  classes: Object
} & PaperSheetType$ChosenQuestion

const ChosenQuestionItem: Function = ({classes, term, answers, samplePhrase}: Props): Node => (
  <Grid item container direction="column">
    <Grid item>
      <Typography variant="headline" component="h3">
        {samplePhrase.phrase}
      </Typography>
    </Grid>
    <Grid
      item
      container
      spacing={40}
      justify="space-around"
    >
      {answers.map((answer: TermType, index: number): Node => (
        <Grid item xs key={index}>
          <Chip
            color={answer.id === term.id ? 'secondary' : 'default'}
            avatar={
              <Avatar className={classes.avatar}>
                {String.fromCharCode(65 + index)}
              </Avatar>
            }
            label={answer.term}
            clickable
            onClick={() => alert('Not now')}
          />
        </Grid>
      ))}
    </Grid>
  </Grid>
)

ChosenQuestionItem.propTypes = {
  classes: PropTypes.object.isRequired,
  term: PropTypes.object.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  samplePhrase: PropTypes.object.isRequired
}

const styles: Object = {
  avatar: {
    color: '#fff',
    backgroundColor: deepPurple[500]
  }
}

export default withStyles(styles)(ChosenQuestionItem)