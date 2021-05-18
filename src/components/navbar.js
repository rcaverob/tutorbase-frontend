/* eslint-disable */

import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { signoutUser } from '../actions';

const useStyles = makeStyles(() => ({
  submitBtn: {
    borderRadius: '50px',
    background: 'linear-gradient(278.24deg, #46BAA4 2.24%, #70D27E 111.24%)',
    color: 'white',
    margin: '0px 25px',
    padding: '10px 30px',
  },
  linkText: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const signUpInOut = () => {
    if (props.authenticated) {
      return (
        <div className="right-header">
          <NavLink id="sign-out-button" to="/" onClick={props.signoutUser}>
            <Button
              variant="contained"
              className={classes.submitBtn + ' ' + classes.linkText}
            >
              Sign Out
            </Button>
          </NavLink>
        </div>
      );
    } else {
      return (
        <div className="right-header">
          <NavLink id="sign-up-button" to="/signup">
            <Button
              variant="contained"
              className={classes.submitBtn + ' ' + classes.linkText}
            >
              Sign Up
            </Button>
          </NavLink>
          <NavLink
            id="sign-in-button"
            to="/signin"
            className={classes.linkText}
          >
            <Button
              variant="contained"
              className={classes.submitBtn + ' ' + classes.linkText}
            >
              Sign In
            </Button>
          </NavLink>
        </div>
      );
    }
  };

  return <nav>{signUpInOut()}</nav>;
};

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
  };
}

export default withRouter(connect(mapStateToProps, { signoutUser })(Navbar));
