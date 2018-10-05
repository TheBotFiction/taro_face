/**
 * @flow
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Layout from 'components/Layout'

const paralax: Object = {
  image: require('assets/img/bg2.jpg'),
  title: 'New Conversation'
}

export class ConversationNewComponent extends Component<*, *> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    selectCharacterSlot: PropTypes.node.isRequired
  }

  render() {
    const { classes, selectCharacterSlot } = this.props
    return (
      <Layout paralax={paralax}>
        <main className={classes.root}>
          {selectCharacterSlot}
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