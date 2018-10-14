/**
 * @flow
 */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import TextField from 'components/UIKit/TextField'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Message from './Message'

import type { CharacterType } from 'types'

type Props = {
  onSubmit: Function,
  selectCharacterSlot: Function
}
type State = {
  characters: Array<CharacterType>
}

export class ConversationForm extends Component<Props, State> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    selectCharacterSlot: PropTypes.func.isRequired
  }

  state = {
    characters: []
  }

  chooseCharacters = (chosenCharacters: Array<CharacterType>): void => {
    this.setState({characters: chosenCharacters})
  }

  render () {
    const {
      onSubmit,
      selectCharacterSlot
    }: Props = this.props
    const { characters }: State = this.state
    return (
      <Form
        onSubmit={onSubmit}
        validate={() => {}}
        mutators={{
          ...arrayMutators
        }}
        render={({
          form: { mutators: { push, pop } },
          handleSubmit,
          pristine,
          submitting,
          invalid,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <FormControl margin="normal" required fullWidth>
                  <Field
                    name="title"
                    type="text"
                    label="Title"
                    variant="outlined"
                    component={TextField}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <Field
                    name="description"
                    type="text"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows="2"
                    component={TextField}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                {selectCharacterSlot({chooseCharacters: this.chooseCharacters})}
              </Grid>
            </Grid>
            <Collapse in={!_.isEmpty(characters)}>
              <Fragment>
                <Grid container spacing={40}>
                  <Grid item xs={4} />
                </Grid>
                <FieldArray name="messages">
                  {({fields}) => (
                    fields.map((name, index) => (
                      <Message key={name} index={index} name={name} characters={characters} />
                    ))
                  )}
                </FieldArray>
                <Grid container spacing={40}>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      type="button"
                      disabled={submitting}
                      fullWidth
                      onClick={() => push('messages', undefined)}
                    >
                      Add More Message
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                      fullWidth
                    >
                      Create Conversation
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            </Collapse>
          </form>
        )}
      />
    )
  }
}

export default ConversationForm
