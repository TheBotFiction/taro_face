/**
 * @flow
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import withStyles from '@material-ui/core/styles/withStyles'
import { Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import Layout from 'components/Layout'

const paralax: Object = {
  image: 'https://res.cloudinary.com/yeuem1vannam/image/upload/v1538759744/backgrounds/bg6.jpg',
  title: 'Conversation'
}

export class ConversationShowComponent extends Component<*,*> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    characters: PropTypes.array.isRequired
  }

  render () {
    const { classes, data: { title, description, messages }, characters } = this.props
    return (
      <Layout paralax={Object.assign(paralax, { title })}>
        <main className={classes.root}>
          <pre>{description}</pre>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Character</TableCell>
                <TableCell>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map(message => (
                <TableRow key={message.id}>
                  <TableCell>
                    {_.find(characters, ['id', message.characterId]).name}
                  </TableCell>
                  <TableCell>{message.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

export default withStyles(styles)(ConversationShowComponent)
