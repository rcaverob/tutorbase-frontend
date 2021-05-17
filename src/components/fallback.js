/* eslint-disable */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    background: 'white',
    width: '90%',
    margin: 'auto',
    padding: '50px 40px',
    borderRadius: '10px',
    boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.25)',
    borderTop: 'solid 15px #19AA6E',
    marginTop: '5%',
  },
  h2: {
    color: '#19AA6E',
    textAlign: 'center',
    marginBottom: '15px',
  },

  button: {
    color: 'white',
    backgroundColor: '#19AA6E',
    margin: '20px 0px',
    '&:hover': {
      backgroundColor: '#747785',
    },
  },
}));

const Fallback = (props) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.content}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h2" className={classes.h2}>
        URL not found.
      </Typography>
      <Button
        onClick={() => {
          props.history.push('/');
        }}
        className={classes.button}
      >
        <Typography variant="h5">Back to Homepage</Typography>
      </Button>
    </Grid>
  );
};

export default withRouter(Fallback);
