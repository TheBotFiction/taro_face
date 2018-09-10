import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Grid, Typography } from '@material-ui/core'

const AdditionalInfo = ({ classes }) => (
  <Grid container justify='center' className={classes.root} align="center">
    <Grid item xs={12}>
      <Typography variant="headline" align="center">
        Frequently Asked Questions
      </Typography>
    </Grid>
    <Grid item xs={12} container className={classes.content}>
      <Grid item xs={12} sm={6} container>
        <Grid item xs={1}></Grid>
        <Grid item xs={11} container>
          <Grid item xs={12}>
            <Typography variant="subheading">How to add question to sheet?</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} container>
        <Grid item xs={1}></Grid>
        <Grid item xs={11} container>
          <Grid item xs={12}>
            <Typography variant="subheading">How to finish the sheet?</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} container>
        <Grid item xs={1}></Grid>
        <Grid item xs={11} container>
          <Grid item xs={12}>
            <Typography variant="subheading">How will the sheet look like?</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} container>
        <Grid item xs={1}></Grid>
        <Grid item xs={11} container>
          <Grid item xs={12}>
            <Typography variant="subheading">How to edit the sheet?</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 10
  },
  content: {
    marginTop: theme.spacing.unit * 10,
    maxWidth: theme.breakpoints.values.lg
  }
})

export default withStyles(styles)(AdditionalInfo)
