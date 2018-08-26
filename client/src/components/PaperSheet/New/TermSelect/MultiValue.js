/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Chip from '@material-ui/core/Chip'
import { emphasize } from '@material-ui/core/styles/colorManipulator'

const MultiValue = (props): Node => (
  <Chip
    tabIndex={-1}
    label={props.children}
    className={classNames(props.classes.chip, {
      [props.classes.chipFocused]: props.isFocused
    })}
    onDelete={event => {
      props.removeProps.onClick()
      props.removeProps.onMouseDown(event)
    }}
  />
)

const styles: Function = (theme): Object => ({
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    )
  }
})

export default withStyles(styles)(MultiValue)