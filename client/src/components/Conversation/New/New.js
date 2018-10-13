/**
 * @flow
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import withStyles from '@material-ui/core/styles/withStyles'
import Layout from 'components/Layout'
import ConversationForm from './Form'

const paralax: Object = {
  image: 'https://res.cloudinary.com/yeuem1vannam/image/upload/v1538759374/backgrounds/bg2.jpg',
  title: 'New Conversation'
}

type MessageType = {
  content: String,
  characterId: number
} | {}

type Props = {
  classes: *,
  selectCharacterSlot: Function,
  onCreateConversation: Function
}

type State = {
  characters: Array<*>
}

export class ConversationNewComponent extends Component<Props, State> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    selectCharacterSlot: PropTypes.func.isRequired,
    onCreateConversation: PropTypes.func.isRequired
  }

  state = {
    characters: [],
  }

  chooseCharacters = (chosenCharacters: Array<MessageType>): void => {
    this.setState({characters: chosenCharacters})
  }

  render () {
    const {
      classes,
      selectCharacterSlot,
      onCreateConversation
    }: Props = this.props
    const { characters }: State = this.state
    return (
      <Layout paralax={paralax}>
        <main className={classes.root}>
          {selectCharacterSlot({chooseCharacters: this.chooseCharacters})}
          { !_.isEmpty(characters) &&
            <ConversationForm characters={characters} onSubmit={onCreateConversation} />
          }
        </main>
      </Layout>
    )
  }
}

const styles = (theme: Object): Object => ({
  root: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    maxWidth: theme.breakpoints.values.md,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export default withStyles(styles)(ConversationNewComponent)