/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const SingleValue = (props): Node => (
  <Typography className={props.classes.singleValue} {...props.innerProps}>
    {props.children}
  </Typography>
)

const styles: Function = (theme): Object => ({
  singleValue: {
    fontSize: 16
  }
})

export default withStyles(styles)(SingleValue)