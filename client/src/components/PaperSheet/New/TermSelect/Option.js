/**
 * @flow
 */
import React from 'react'
import type { Node } from 'react'
import MenuItem from '@material-ui/core/MenuItem'

// this component is maintained internally by react-select, so that we don't
// have to strictly check its props
const Option = (props: any): Node => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400
    }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
)

export default Option