/**
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Select from 'react-select'
import NoSsr from '@material-ui/core/NoSsr'

import termSelectComponents from './TermSelect'

type Props = {}
type State = {}

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}))

class New extends Component<Props, State> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
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
    const { classes, theme } = this.props;

    const selectStyles: Object = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary
      })
    }

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={suggestions}
            components={termSelectComponents}
            value={this.state.selected}
            onChange={this.handleChange}
            placeholder="Search a country (start with a)"
          />
        </NoSsr>
      </div>
    );
  }
}

const styles: Function = (theme): Object => ({
  root: {
    flexGrow: 1,
    height: 250
  }
})

export default withStyles(styles, { withTheme: true })(New)