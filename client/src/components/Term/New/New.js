/**
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import type { TermType } from 'types/index';
import { withStyles } from '@material-ui/core/styles';
import { Input, Button } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

const TermCreate = (props) => {
  const { classes } = props;
  return (
    <div>
      <h1>Create new term</h1>
      <form>
        <div>
          <Input
            placeholder="Term"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <Input
            placeholder="Meaning"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <Input
            placeholder="Reading"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
        </div>
        <div>
          <Input
            placeholder="Sample phrase"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </div>
  )
};

TermCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TermCreate);
