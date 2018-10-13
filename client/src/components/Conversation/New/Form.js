/**
 * @flow
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import TextField from 'components/UIKit/TextField'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Message from './Message'

type MessageType = {
  content: String,
  characterId: number
} | {}

export class ConversationForm extends Component<*, *> {
  static propTypes = {
    characters: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    messages: [{}]
  }

  addMoreMessage = (event: any): void => {
    const { messages }: { messages: Array<MessageType> } = this.state
    this.setState({
      messages: [
        ...messages,
        {}
      ]
    })
  }

  render () {
    const { characters, onSubmit } = this.props
    const { messages } = this.state
    return (
      <Form
        onSubmit={onSubmit}
        validate={() => {}}
        initialValues={{ messages: messages}}
        render={({ handleSubmit, pristine, submitting, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={40}>
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
              <Grid item xs={12}>
                <FormControl margin="normal" required fullWidth>
                  <Field
                    name="description"
                    type="text"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows="4"
                    component={TextField}
                  />
                </FormControl>
              </Grid>
            </Grid>
            {messages.map((message, index) => (
              <Message key={index} index={index} characters={characters} />
            ))}
            <Grid container spacing={40}>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  type="button"
                  disabled={submitting}
                  fullWidth
                  onClick={this.addMoreMessage}
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
          </form>
        )}
      />
    )
  }
}

export default ConversationForm
