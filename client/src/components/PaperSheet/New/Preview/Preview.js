/**
 * @flow
 */

import React, { Component } from 'react'
import type { Node } from 'react'
import type { TermType, SamplePhraseType } from 'types'
import PropTypes from 'prop-types'
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

class PreviewComponent extends Component<Props, *> {
  static propTypes = {
    term: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  }
  render () {
    const { term, classes } = this.props
    const similars: Array<TermType> | void = term.similars
    if (!similars) return null

    const samplePhrase: SamplePhraseType | void = _.sample(term.samplePhrases)
    if (!samplePhrase) return null

    const terms: Array<TermType> = [
      {id: term.id, term: term.term},
      ...similars
    ]
    const answers: Array<TermType> = _.shuffle(terms)
    return (
      <Paper className={classes.root}>
        <Grid container spacing={16} direction="column">
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
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
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
  },
  avatar: {
    color: '#fff',
    backgroundColor: deepPurple[500]
  }
})

export default withStyles(styles)(PreviewComponent)