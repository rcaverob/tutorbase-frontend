/* eslint-disable */
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { signupUser } from '../actions';

const useStyles = makeStyles((theme) => ({
  page: {
    background: '#F7F7F8',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUp: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.25)',
    borderTop: 'solid 15px #19AA6E',
    width: '500px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
    },
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '500px',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  deleteSubmit: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '250px',
  },
  error: {
    color: '#CD5C5C',
    marginTop: 0,
  },
  '@global': {
    input: {
      width: '400px',
      height: '26px',
      [theme.breakpoints.down('xs')]: {
        width: 'auto',
        margin: '10px 14px',
        flex: 1,
      },
    },
    h1: {
      color: '#19AA6E',
    },
    p: {
      fontWeight: 'bold',
      color: '#262B40',
    },
    button: {
      background: 'white',
      color: '#19AA6E',
      padding: '5px',
      border: 'solid 1px #19AA6E',
      borderRadius: 3,
      width: '120px',
      height: '30px',
      fontWeight: 'bold',
      '&:hover': {
        background: '#19AA6E',
        color: 'white',
      },
    },
  },
}));

const SignUpForm = (props) => {
  const [state, setState] = useState({
    editEmail: '',
    editPassword: '',
    editName: '',
    editYear: '',
    error: '',
  });

  const signUp = (event) => {
    event.preventDefault(); // prevent page reload on submit
    const NewUser = {
      name: state.editName,
      year: state.editYear,
      email: state.editEmail,
      password: state.editPassword,
    };
    // handle errors on the front end
    if (
      !state.editName ||
      !state.editYear ||
      !state.editEmail ||
      !state.editPassword ||
      !state.editEmail.toLowerCase().includes('@dartmouth.edu')
    ) {
      setState({
        error:
          'You must provide a unique Dartmouth email address and password, as well as a name and year.',
      });
    } else {
      props.signupUser(NewUser, props.history);
    }
  };

  // render() {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <form className={classes.signUp}>
        <h1>Sign up!</h1>
        <p className={classes.error}>{state.error}</p>
        <div className={classes.section}>
          <p>Name</p>
          <input
            className={classes.input}
            onChange={(event) => {
              setState({ ...state, editName: event.target.value });
            }}
            value={state.editName}
          />
        </div>
        <div className={classes.section}>
          <p>Year</p>
          <input
            type="number"
            onChange={(event) => {
              setState({ ...state, editYear: event.target.value });
            }}
            value={state.editYear}
          />
        </div>
        <div className={classes.section}>
          <p>Email</p>
          <input
            onChange={(event) => {
              setState({ ...state, editEmail: event.target.value });
            }}
            value={state.editEmail}
          />
        </div>
        <div className={classes.section}>
          <p>Password</p>
          <input
            type="password"
            onChange={(event) => {
              setState({ ...state, editPassword: event.target.value });
            }}
            value={state.editPassword}
          />
        </div>
        <div className={classes.deleteSubmit}>
          <button
            onClick={() => {
              props.history.push('/');
            }}
            type="button"
            tabIndex={0}
          >
            Back
          </button>
          <button onClick={signUp} type="button" tabIndex={0}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
  // }
};

export default withRouter(connect(null, { signupUser })(SignUpForm));
