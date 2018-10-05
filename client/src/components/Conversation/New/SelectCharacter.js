import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export class SelectCharacterComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  state = {
    selectedIds: []
  }

  handleChange = event => {
    this.setState({ selectedIds: event.target.value })
  }

  render () {
    const { classes, data } = this.props
    const { selectedIds } = this.state
    return (
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel htmlFor="select-multiple-character">Select Characters</InputLabel>
        <Select
          multiple
          value={selectedIds}
          onChange={this.handleChange}
          input={<Input id="select-multiple-character" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={_.find(data, ['id', value]).name} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {data.map(character => (
            <MenuItem key={character.id} value={character.id}>
              <Checkbox checked={selectedIds.indexOf(character.id) > -1} />
              <ListItemText primary={character.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    // margin: theme.spacing.unit,
    // minWidth: 120
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4,
  }
})

export default withStyles(styles)(SelectCharacterComponent)