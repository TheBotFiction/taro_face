import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button, Dialog, CircularProgress } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CheckIcon from '@material-ui/icons/Check'
import ScheduleIcon from '@material-ui/icons/Schedule'
import green from '@material-ui/core/colors/green'

class PageLoading extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    variant: PropTypes.oneOf(['auth', 'load'])
  }

  static defaultProps = {
    variant: 'load'
  }

  static iconSet = {
    auth: {
      pre: <AccountCircleIcon fontSize="inherit" />,
      post: <CheckIcon />
    },
    load: {
      pre: <ScheduleIcon fontSize="inherit" />,
      post: <CheckIcon />
    }
  }

  render() {
    const { open, variant, classes } = this.props
    const iconSet = this.constructor.iconSet[variant]
    return (
      <Dialog open={open} className={classes.loadingDialog}>
        <div className={classes.wrapper}>
          <Button
            variant="fab"
            color="primary"
            className={classes.loadingButton}
          >
            {open ? iconSet.pre : iconSet.post}
          </Button>
          {!open && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
      </Dialog>
    )
  }
}

const styles = theme => ({
  loadingDialog: {
    '& [class^="MuiPaper"]': {
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  loadingButton: {
    fontSize: 36
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  }
})

export default withStyles(styles)(PageLoading)
