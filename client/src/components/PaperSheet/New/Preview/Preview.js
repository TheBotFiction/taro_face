/**
 * @flow
 */

import React, { Component } from 'react'
import type { Node } from 'react'
import type { TermType } from 'types'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import deepPurple from '@material-ui/core/colors/deepPurple'

type Props = {
  term: TermType,
  classes: Object
}

class PreviewComponent extends Component<*, *> {
  render () {
    const { term, classes } = this.props;
    const answers: Array<string> = _.shuffle([term.term, 'AAA', 'BBB', 'CCC']);
    const answerIndexes: Array<string> = ['A', 'B', 'C', 'D'];
    return (
      <Paper className={classes.root}>
        <Grid container spacing={16} direction="column">
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="headline" component="h3">
                {term.samplePhrases[0].phrase}
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
                    color={answer === term.term ? 'secondary' : 'default'}
                    avatar={<Avatar className={classes.avatar}>{answerIndexes[index]}</Avatar>}
                    label={answer}
                    clickable
                    onClick={() => alert('Not now')}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
            >
              Add Term
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
  },
  avatar: {
    color: '#fff',
    backgroundColor: deepPurple[500]
  }
})

export default withStyles(styles)(PreviewComponent)