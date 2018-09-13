/**      
 * @flow
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { CssBaseline, Button } from '@material-ui/core'
import { Form, Field } from 'react-final-form'
import Layout from 'components/Layout'
import TextField from 'components/UIKit/TextField'
import Term from './Term'

type Props = {
  classes: Object,
  terms: Array<Object>,
  onSubmit: Function,
  onAnalyze: Function
}

const paralax: Object = {
  image: require('assets/img/bg7.jpg')
}

export class TermNewComponent extends Component<Props> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    terms: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func.isRequired,
    onAnalyze: PropTypes.func.isRequired
  }

  static defaultProps = {
    terms: [{}],
    onSubmit: () => {},
    onAnalyze: () => {}
  }

  render() {
    const { classes, onSubmit, onAnalyze, terms } = this.props
    return (
      <Layout paralax={paralax}>
        <CssBaseline />
        <main className={classes.root}>
          <Form
            onSubmit={onAnalyze}
            render={({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  label="Sample phrase"
                  name="samplePhrase"
                  margin="normal"
                  multiline
                  rows="4"
                  fullWidth
                  helperText="Give a sample paragraph. Taro will help you to pick terms"
                  component={TextField}
                />
                <Button type="submit">Analyze</Button>
              </form>
            )}
          />
          <Form
            onSubmit={onSubmit}
            validate={() => {}}
            initialValues={{ term: terms }}
            render={({ handleSubmit, pristine, submitting, invalid, submitErrors }) => (
              <form onSubmit={handleSubmit}>
                {terms.map((_term, index) => (
                  <Term index={index} key={index} />
                ))}
                <Button type="submit">Create</Button>
              </form>
            )}
          />
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

export default withStyles(styles)(TermNewComponent)
