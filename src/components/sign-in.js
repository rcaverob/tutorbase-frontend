/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { signinUser } from '../actions';
import { makeStyles } from '@material-ui/core/styles';

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
  signIn: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.25)',
    borderTop: 'solid 15px #19AA6E',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      padding: 0,
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
  link: {
    color: '#19AA6E',
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

const SignInForm = (props) => {
  const [state, setState] = useState({
    editEmail: '',
    editPassword: '',
    error: '',
  });

  const signIn = (event) => {
    if (!state.editPassword || !state.editEmail)
      setState({
        ...state,
        error: 'Please provide an email and password to sign in!',
      });
    else if (!state.editEmail.toLowerCase().includes('@dartmouth.edu'))
      setState({
        ...state,
        error: 'Users must have a valid dartmouth.edu email',
      });
    else {
      event.preventDefault(); // prevent page reload on submit
      const User = {
        email: state.editEmail,
        password: state.editPassword,
      };
      props.signinUser(User, props.history);
      if (!props.auth && props.authError)
        setState({ ...state, error: 'Invalid Credentials' });
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.page}>
      <form className={classes.signIn}>
        <h1>Sign in!</h1>
        <p className={classes.error}>{state.error}</p>
        <div className={classes.section}>
          <p style={{ marginRight: '32px' }}>Email</p>
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
          <button onClick={signIn} type="button" tabIndex={0}>
            Submit
          </button>
        </div>
      </form>
      {/* <p>
        Don&#39;t have an account?{' '}
        <Link to="/signup" className={classes.link}>
          {' '}
          Sign up!
        </Link>
      </p> */}
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
    authError: reduxState.auth.authError,
  };
}

export default withRouter(connect(mapStateToProps, { signinUser })(SignInForm));
