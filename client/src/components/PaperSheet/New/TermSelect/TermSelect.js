/**
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AsyncSelect from 'react-select/lib/Async'

import NoOptionsMessage from './NoOptionsMessage'
import Control from './Control'
import Option from './Option'
import Placeholder from './Placeholder'
import SingleValue from './SingleValue'
import ValueContainer from './ValueContainer'
import MultiValue from './MultiValue'
import Menu from './Menu'

const termSelectComponents: Object = {
  NoOptionsMessage,
  Control,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  MultiValue,
  Menu
}

type Props = {}
type State = {}

class TermSelect extends Component<Props, State> {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    loadOptions: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    selected: null
  }

  handleChange (value) {
    this.setState({ selected: value })
  }

  render() {
    const { theme, loadOptions } = this.props

    const selectStyles: Object = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary
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