/**
 * @flow
 */
import React, { Component } from 'react'
import type { PaperSheetType, QuestionType } from 'types'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Questions from './Questions'
import Layout from 'components/Layout'

type Props = {
  data: PaperSheetType,
  classes: Object
}

const paralax: Object = {
  image: require('assets/img/bg7.jpg')
}

export class PaperSheetShowComponent extends Component<Props, {| |}> {
  static propTypes = {
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  }

  render () {
    const { data, classes }: { data: PaperSheetType, classes: Object } = this.props
    const { questions }: { questions: Array<QuestionType> } = data
    return (
      <Layout paralax={paralax}>
        <main className={classes.root}>
          <Questions questions={questions} />
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

export default withStyles(styles)(PaperSheetShowComponent)
