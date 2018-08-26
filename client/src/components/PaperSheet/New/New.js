/**
 * @flow
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import FormControl from '@material-ui/core/FormControl'

import TermSelect from './TermSelect'

type Props = {
  classes: Object<any>,
  loadOptions: Function,
  onSelectTerm: Function
}

type State = *

class NewComponent extends Component<Props, State> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadOptions: PropTypes.func.isRequired,
    onSelectTerm: PropTypes.func.isRequired
  }

  render() {
    const { classes, loadOptions } = this.props

    return (
      <Fragment>
        <Grid container>
        </Grid>
        <Grid container className={classes.termSelectZone}>
          <Grid item xs={9} zeroMinWidth>
            <TermSelect
              loadOptions={loadOptions}
              onSelect={this.props.onSelectTerm}
            />
          </Grid>
          <Grid item>
            <FormControl>
              <Button variant="contained" color="primary" size="small" className={classes.button}>
                Add Term
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </FormControl>
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