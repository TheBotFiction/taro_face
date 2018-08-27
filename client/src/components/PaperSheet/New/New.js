/**
 * @flow
 */

import React, { Component, Fragment } from 'react'
import type { Node } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import TermSelect from './TermSelect'

type Props = {
  classes: Object,
  loadOptions: Function,
  onSelectTerm: Function,
  previewSlot: Node
}

type State = *

class NewComponent extends Component<Props, State> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadOptions: PropTypes.func.isRequired,
    onSelectTerm: PropTypes.func.isRequired,
    previewSlot: PropTypes.node.isRequired
  }

  render() {
    const { classes, loadOptions, previewSlot, onSelectTerm } = this.props

    return (
      <Fragment>
        {previewSlot}
        <Grid container className={classes.termSelectZone}>
          <Grid item xs={9} zeroMinWidth>
            <TermSelect
              loadOptions={loadOptions}
              onSelect={onSelectTerm}
            />
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

const styles: Function = (theme): Object => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  button: {
    // margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  termSelectZone: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-around'
  }
})

export default withStyles(styles)(NewComponent)