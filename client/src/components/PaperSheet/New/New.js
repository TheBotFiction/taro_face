/**
 * @flow
 */

import React, { Component } from 'react'
import type { Node } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, Divider } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import AddToQueueIcon from '@material-ui/icons/AddToQueue'

import TermSelect from './TermSelect'

type Props = {
  classes: Object,
  hasPreview: boolean,
  hasQuestion: boolean,
  loadOptions: Function,
  onSelectTerm: Function,
  onChooseQuestion: Function,
  onSubmit: Function,
  previewSlot: Node,
  chosenSlot: Node
}

type State = *

class NewComponent extends Component<Props, State> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    hasPreview: PropTypes.bool,
    hasQuestion: PropTypes.bool,
    loadOptions: PropTypes.func.isRequired,
    onSelectTerm: PropTypes.func.isRequired,
    onChooseQuestion: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    previewSlot: PropTypes.node.isRequired,
    chosenSlot: PropTypes.node.isRequired
  }

  render() {
    const {
      classes,
      hasPreview,
      hasQuestion,
      loadOptions,
      previewSlot,
      chosenSlot,
      onSelectTerm,
      onChooseQuestion,
      onSubmit
    }: Props = this.props

    return (
      <main className={classes.root}>
        {chosenSlot}
        {previewSlot}
        <Grid container className={classes.termSelectZone}>
          <Grid item lg={8} xs={8}>
            <TermSelect
              loadOptions={loadOptions}
              onSelect={onSelectTerm}
            />
          </Grid>
          <Grid item lg={4} xs={4} className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              disabled={!hasPreview}
              className={classes.button}
              onClick={onChooseQuestion}
            >
              Add To PaperSheet
              <AddToQueueIcon className={classes.rightIcon} />
            </Button>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container>
          <Grid item lg={8} xs={8} />
          <Grid item lg={4} xs={4} className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              disabled={!hasQuestion}
              className={classes.button}
              onClick={onSubmit}
            >
              Create PaperSheet
              <CloudUploadIcon className={classes.rightIcon} />
            </Button>
          </Grid>
        </Grid>
      </main>
    )
  }
}

const styles: Function = (theme): Object => ({
  root: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 16,
    maxWidth: theme.breakpoints.values.md,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonContainer: {
    textAlign: 'center'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  divider: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 16
  },
  termSelectZone: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-around',
    marginTop: 40
  }
})

export default withStyles(styles)(NewComponent)