import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid, Typography, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  fullScreen: {
    minHeight: '100vh',
    backgroundColor: '#F7F7F8',
  },
  content: {
    background: 'white',
    width: '90%',
    margin: 'auto',
    padding: '50px 40px',
    borderRadius: '10px',
    boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.25)',
    borderTop: 'solid 15px #19AA6E',
  },
  h2: {
    color: '#19AA6E',
    textAlign: 'center',
    marginBottom: '15px',
  },
  h5: {
    color: '#262B40',
    textAlign: 'center',
    marginBottom: '15px',
  },
  text: {
    color: '#262B40',
    textAlign: 'center',
  },
  credit: {
    color: '#747785',
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
  },
  button: {
    color: 'white',
    backgroundColor: '#19AA6E',
    borderRadius: '25px',
    margin: '20px 0px',
    fontSize: '1.15rem',
    '&:hover': {
      background: '#747785',
    },
  },
  step: {
    height: '140px',
  },
}));

const About = (props) => {
  const classes = useStyles();

  const renderStartButton = () => {
    return props.auth
      ? (<Button className={classes.button} variant="contained" onClick={() => { props.history.push('/posts'); }}>Get Started</Button>)
      : (<Button className={classes.button} variant="contained" onClick={() => { props.history.push('/signin'); }}>Get Started</Button>);
  };

  return (
    <div className={classes.fullScreen}>
      <Grid container direction="column" justiy="center" alignItems="center">
        <Grid item>
          <KeyboardArrowUpIcon style={{ fontSize: 64, color: '#262B40' }} key={0} onClick={props.handlePageUp} />
        </Grid>
      </Grid>
      <main className={classes.content}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h2" className={classes.h2}>An Easier Bridge Between Dartmouth&#39;s Tutors and Students</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" className={classes.h5}>
                The Tutor Clearinghouse provides a unique opporunity for Dartmouth students to tutor Dartmouth students for free.
                TutorBase is a modern way to connect tutors and tutees.
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center" alignItems="center" spacing={3}>
              <Grid item xs={3}>
                <Grid container direction="column" alignItems="center" justify="center" className={classes.step}>
                  <AccountBoxIcon fontSize="large" style={{ color: '#19AA6E' }} />
                  <Typography className={classes.text}>Create an account with your dartmouth.edu email</Typography>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction="column" alignItems="center" justify="center" className={classes.step}>
                  <PostAddIcon fontSize="large" style={{ color: '#19AA6E' }} />
                  <Typography className={classes.text}>Post a request or look at who’s already posted.</Typography>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction="column" alignItems="center" justify="center" className={classes.step}>
                  <PersonAddIcon fontSize="large" style={{ color: '#19AA6E' }} />
                  <Typography className={classes.text}>If you find a tutor/tutee you like, match with them</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {renderStartButton()}
          </Grid>
          <Grid item>
            <Typography className={classes.credit}><b>The TutorBase Team:</b> Nicolas Bergen, Rodrigo Cavero Blades, Brittany Critchfield, Joseph Notis, Kimberley Rangel, Michael Zhou</Typography>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
  };
}


export default withRouter(connect(mapStateToProps, null)(About));
