/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import { withStyles } from '@material-ui/core/styles'

const ValueContainer = (props): Node => (
  <div className={props.classes.valueContainer}>
    {props.children}
  </div>
)

const styles: Function = (theme): Object => ({
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  }
})

export default withStyles(styles)(ValueContainer)