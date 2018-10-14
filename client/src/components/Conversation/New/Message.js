/**
 * @flow
 */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import TextField from 'components/UIKit/TextField'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'

import type { Node } from 'react'
import type { CharacterType } from 'types'

type Props = {
  index: number,
  name: string,
  characters: Array<CharacterType>
}

export class Message extends Component<Props, *> {
  static propTypes = {
    characters: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  }

  render () {
    const { name, characters }: Props = this.props
    return (
      <Fragment>
        <Grid container spacing={40} justify="space-between">
          <Grid item xs={4}>
            <FormControl margin="normal" required fullWidth>
              <Field
                id="outlined-select-currency-native"
                select
                SelectProps={{
                  native: true
                }}
                name={`${name}.characterId`}
                type="text"
                label="Character"
                variant="outlined"
                required
                component={TextField}
              >
                <option />
                {characters.map((character: CharacterType): Node => (
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
                name={`${name}.content`}
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
