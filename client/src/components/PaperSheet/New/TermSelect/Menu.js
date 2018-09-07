/**
 * @flow
 * @todo there is a trouble with the overlay styles, so still using the original
 * menu
 */
import React from 'react'
import type { Node } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const Menu = (props): Node => (
  <Paper square className={props.classes.paper} {...props.innerProps}>
    {props.children}
  </Paper>
)

const styles: Function = (theme): Object => ({
  paper: {
    marginTop: theme.spacing.unit
  }
})

export default withStyles(styles)(Menu)