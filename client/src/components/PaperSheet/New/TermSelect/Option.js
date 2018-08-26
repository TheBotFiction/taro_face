/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import MenuItem from '@material-ui/core/MenuItem'

const Option = (props): Node => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400,
    }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
)

export default Option