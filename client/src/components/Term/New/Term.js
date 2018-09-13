import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, FormControl } from '@material-ui/core'
import { Field } from 'react-final-form'
import TextField from 'components/UIKit/TextField'

export class Term extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired
  }

  static defaultProps = {
    index: 0
  }

  render() {
    const { index } = this.props
    return (
      <Fragment>
        <Grid container spacing={40} justify="space-between">
          <Grid item xs={4}>
            <FormControl margin="normal" required fullWidth>
              <Field
                name={`term[${index}][term]`}
                type="text"
                label="Term"
                required
                autoFocus
                component={TextField}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl margin="normal" fullWidth>
              <Field
                name={`term[${index}][reading]`}
                type="text"
                label="Reading"
                component={TextField}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl margin="normal" fullWidth>
              <Field
                name={`term[${index}][meaning]`}
                type="text"
                label="Meaning"
                component={TextField}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default Term
