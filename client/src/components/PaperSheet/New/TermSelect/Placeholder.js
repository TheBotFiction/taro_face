/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const Placeholder = (props): Node => (
  <Typography
    color="textSecondary"
    className={props.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
)

const styles: Function = (theme): Object => ({
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  }
})

export default withStyles(styles)(Placeholder)