/**
 * @flow
 */
import React, { Component } from 'react'
import type { Node } from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const inputComponent = ({inputRef, ...props}): Node => (
  <div ref={inputRef} {...props} />
)

// Stateless component cannot access ref
class Control extends Component {
  render () {
    const props = this.props
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          }
        }}
        {...props.selectProps.textFieldProps}
      />
    )
  }
}


const styles: Function = (theme): Object => ({
  input: {
    display: 'flex',
    padding: 0
  }
})

export default withStyles(styles)(Control)