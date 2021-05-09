import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  fullScreen: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#F7F7F8',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    background: 'white',
    maxWidth: '90%',
    minHeight: '60vh',
    margin: 'auto',
    padding: '50px 40px',
    borderRadius: '10px',
    boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.25)',
    borderTop: 'solid 15px #19AA6E',
    [theme.breakpoints.down('xs')]: {
      padding: '20px 15px',
      flex: 1,
    },
  },
  h2: {
    color: '#19AA6E',
    maxWidth: '40ch',
    textAlign: 'center',
    marginBottom: '15px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.75rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.25rem',
    },
  },
  h5: {
    color: '#262B40',
    textAlign: 'center',
    marginBottom: '15px',
    maxWidth: '70ch',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.375rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.125rem',
    },
  },
  text: {
    color: '#262B40',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.915em',
    },
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
  midItem: {
    maxWidth: '225px',
  },
}));

const About = (props) => {
  const classes = useStyles();

  const renderStartButton = () => {
    return props.auth ? (
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => {
          props.history.push('/posts');
        }}
      >
        Get Started
      </Button>
    ) : (
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => {
          props.history.push('/signin');
        }}
      >
        Get Started
      </Button>
    );
  };

  return (
    <div className={classes.fullScreen}>
      <KeyboardArrowUpIcon
        style={{ fontSize: 64, color: '#262B40' }}
        key={0}
        onClick={props.handlePageUp}
      />
      <main className={classes.content}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h2" className={classes.h2}>
                An Easier Bridge Between Dartmouth&#39;s Tutors and Students
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" className={classes.h5}>
                The Tutor Clearinghouse provides a unique opporunity for
                Dartmouth students to tutor Dartmouth students for free.
                TutorBase is a modern way to connect tutors and tutees.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12} sm={3} className={classes.midItem}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <AccountBoxIcon
                    fontSize="large"
                    style={{ color: '#19AA6E' }}
                  />
                  <Typography className={classes.text}>
                    Create an account with your dartmouth.edu email
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} className={classes.midItem}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <PostAddIcon fontSize="large" style={{ color: '#19AA6E' }} />
                  <Typography className={classes.text}>
                    Post a request or look at who’s already posted.
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} className={classes.midItem}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <PersonAddIcon
                    fontSize="large"
                    style={{ color: '#19AA6E' }}
                  />
                  <Typography className={classes.text}>
                    If you find a tutor/tutee you like, match with them
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>{renderStartButton()}</Grid>
          <Grid item>
            <Typography className={classes.credit}>
              <b>The TutorBase Team:</b> Nicolas Bergen, Rodrigo Cavero Blades,
              Brittany Critchfield, Joseph Notis, Kimberley Rangel, Michael Zhou
            </Typography>
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
