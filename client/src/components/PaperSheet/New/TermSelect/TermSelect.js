/**
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AsyncSelect from 'react-select/lib/Async'
import type { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

import NoOptionsMessage from './NoOptionsMessage'
import Control from './Control'
import Option from './Option'
import Placeholder from './Placeholder'
import SingleValue from './SingleValue'
import ValueContainer from './ValueContainer'
import MultiValue from './MultiValue'

const termSelectComponents: Object = {
  NoOptionsMessage,
  Control,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  MultiValue
}

type SelectedValue = {
  value: string | number,
  label: string | number
}

type Props = {
  theme: ThemeOptions,
  loadOptions: Function,
  onSelect: Function

}
type State = {
  selected: null | SelectedValue
}

class TermSelect extends Component<Props, State> {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    loadOptions: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  handleChange: Function

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    selected: null
  }

  handleChange (value) {
    this.setState({ selected: value }, () => {
      this.props.onSelect(value.value)
    })
  }

  render() {
    type RenderableProps = { theme: ThemeOptions, loadOptions: Function }
    const { theme, loadOptions }: RenderableProps = this.props

    let inputColor: any = ''
    if (theme.palette && theme.palette.text) {
      inputColor = theme.palette.text.primary
    }
    const selectStyles: Object = {
      input: base => ({
        ...base,
        color: inputColor
      })
    }

    return (
      <AsyncSelect
        styles={selectStyles}
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        components={termSelectComponents}
        value={this.state.selected}
        onChange={this.handleChange}
        placeholder="Search a term"
      />
    )
  }
}

export default withStyles({}, {withTheme: true})(TermSelect)