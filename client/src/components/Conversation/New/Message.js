import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import TextField from 'components/UIKit/TextField'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'

export class Message extends Component {
  static propTypes = {
    characters: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired
  }

  static defaultProps = {
    index: 0
  }

  render () {
    const { index, characters } = this.props
    return (
      <Fragment>
        <Grid container spacing={40} justify="space-between">
          <Grid item xs={4}>
            <FormControl margin="normal" required fullWidth>
              <Field
                id="outlined-select-currency-native"
                select
                name={`messages[${index}][characterId]`}
                type="text"
                label="Character"
                SelectProps={{
                  native: true
                }}
                variant="outlined"
                required
                component={TextField}
              >
                <option />
                {characters.map(character => (
                  <option key={character.id} value={character.id}>
                    {character.name}
                  </option>
                ))}
              </Field>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl margin="normal" required fullWidth>
              <Field
                name={`messages[${index}][content]`}
                type="text"
                label="Message"
                variant="outlined"
                required
                autoFocus
                component={TextField}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default Message
