/**
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AsyncSelect from 'react-select/lib/Async'
import NoSsr from '@material-ui/core/NoSsr'

import termSelectComponents from './TermSelect'

type Props = {}
type State = {}

class New extends Component<Props, State> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
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
    const { classes, theme, loadOptions } = this.props

    const selectStyles: Object = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary
      })
    }

    return (
      <div className={classes.root}>
        <NoSsr>
          <AsyncSelect
            classes={classes}
            styles={selectStyles}
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            components={termSelectComponents}
            value={this.state.selected}
            onChange={this.handleChange}
            placeholder="Search a country (start with a)"
          />
        </NoSsr>
      </div>
    )
  }
}

const styles: Function = (theme): Object => ({
  root: {
    flexGrow: 1,
    height: 250
  }
})

export default withStyles(styles, { withTheme: true })(New)