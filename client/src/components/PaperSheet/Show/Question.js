/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import type { QuestionType } from 'types'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Avatar, Chip, Paper } from '@material-ui/core'
import deepPurple from '@material-ui/core/colors/deepPurple'

type Props = {
  classes: Object,
} & QuestionType

const Question: Function = ({classes, term, answers, phrase}: Props): Node => (
  <Grid item container direction="column">
    <Paper
      elevation={1}
      className={classes.paper}
    >
      <Grid item>
        <Typography variant="headline" component="h3">
          {phrase}
        </Typography>
      </Grid>
      <Grid
        item
        container
        spacing={40}
        justify="space-around"
      >
        {answers.map((answer: string, index: number): Node => (
          <Grid item xs key={index}>
            <Chip
              color={answer === term ? 'secondary' : 'default'}
              avatar={
                <Avatar className={classes.avatar}>
                  {String.fromCharCode(65 + index)}
                </Avatar>
              }
              label={answer}
              clickable
              onClick={() => alert('Not now')}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Grid>
)

Question.propTypes = {
  classes: PropTypes.object.isRequired,
  term: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  phrase: PropTypes.string.isRequired
}

const styles: Function = (theme: any) => ({
  avatar: {
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
})

export default withStyles(styles)(Question)