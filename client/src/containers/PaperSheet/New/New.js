/**
 * @flow
 */

import React, { Component } from 'react'
import PaperSheetNewComponent from 'components/PaperSheet/New'

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

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    const matchedSuggestions: Array<Object> = suggestions.filter((option): boolean => (
      option.label.toLowerCase().indexOf(inputValue) >= 0
    ))
    callback(matchedSuggestions)
  }, 1000)
}

class New extends Component<Props, State> {
  render () {
    return(<PaperSheetNewComponent loadOptions={loadOptions} />)
  }
}

export default New