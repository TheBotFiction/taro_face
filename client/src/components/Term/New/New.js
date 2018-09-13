/**      
 * @flow
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Grid, CssBaseline, Button, Divider, Collapse, Slide } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import FastfoodIcon from '@material-ui/icons/Fastfood'
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
  image: require('assets/img/bg7.jpg'),
  title: 'Create new Terms'
}

export class TermNewComponent extends Component<Props, *> {
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

  togglePhraseInput: Function

  constructor (props: Props) {
    super(props)
    this.togglePhraseInput = this.togglePhraseInput.bind(this)
  }

  state = {
    showPhraseInput: false
  }

  togglePhraseInput (e: any) {
    const { showPhraseInput } = this.state
    if (showPhraseInput) return
    e.preventDefault()
    this.setState({showPhraseInput: !this.state.showPhraseInput})
  }

  render () {
    const { classes, onSubmit, onAnalyze, terms } = this.props
    const { showPhraseInput } = this.state
    return (
      <Layout paralax={paralax}>
        <CssBaseline />
        <main className={classes.root}>
          <Form
            onSubmit={onAnalyze}
            render={({ handleSubmit, pristine, submitting, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Collapse in={showPhraseInput}>
                  <Field
                    label="Sample phrase"
                    name="samplePhrase"
                    margin="normal"
                    required
                    multiline
                    rows="4"
                    fullWidth
                    helperText="Give a sample paragraph. Taro will help you to pick terms"
                    component={TextField}
                  />
                </Collapse>
                <Grid container>
                  <Grid item xs={8} />
                  <Grid item xs={4} className={classes.buttonContainer}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classes.button}
                      type={showPhraseInput ? 'submit' : 'button'}
                      onClick={this.togglePhraseInput}
                      disabled={submitting || invalid}
                    >
                      Analyze Phrase to Terms
                      <FastfoodIcon className={classes.rightIcon} />
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
          <Divider className={classes.divider} />
          <Form
            onSubmit={onSubmit}
            validate={() => {}}
            initialValues={{ term: terms }}
            render={({ handleSubmit, pristine, submitting, invalid }) => (
              <form onSubmit={handleSubmit}>
                {terms.map((term, index) => (
                  <Slide
                    direction="up"
                    in={!!term}
                    style={{ transitionDelay: 50 }}
                    mountOnEnter
                    unmountOnExit
                    key={index}
                  >
                    <Term index={index} />
                  </Slide>
                ))}
                <Divider className={classes.divider} />
                <Grid container>
                  <Grid item xs={8} />
                  <Grid item xs={4} className={classes.buttonContainer}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      type="submit"
                      disabled={terms.length <= 0 || submitting}
                      className={classes.button}
                    >
                      Create Terms
                      <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                  </Grid>
                </Grid>
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
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  divider: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  buttonContainer: {
    textAlign: 'right'
  }
})

export default withStyles(styles)(TermNewComponent)
