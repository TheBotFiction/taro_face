/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

// this component is maintained internally by react-select, so that we don't
// have to strictly check its props
const NoOptionsMessage = (props: any): Node => (
  <Typography
    color="textSecondary"
    className={props.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
)

const styles: Function = (theme): Object => ({
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  }
})

export default withStyles(styles)(NoOptionsMessage)