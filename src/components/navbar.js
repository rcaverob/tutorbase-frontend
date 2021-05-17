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
          <Button variant="contained" className={classes.submitBtn}>
            <NavLink
              id="sign-out-button"
              to="/"
              onClick={props.signoutUser}
              className={classes.linkText}
            >
              Sign Out
            </NavLink>
          </Button>
        </div>
      );
    } else {
      return (
        <div className="right-header">
          <Button variant="contained" className={classes.submitBtn}>
            <NavLink
              id="sign-up-button"
              to="/signup"
              className={classes.linkText}
            >
              Sign Up
            </NavLink>
          </Button>
          <Button variant="contained" className={classes.submitBtn}>
            <NavLink
              id="sign-in-button"
              to="/signin"
              className={classes.linkText}
            >
              Sign In
            </NavLink>
          </Button>
        </div>
      );
    }
  };

  return (
    <nav>
      {/* <ul> */}
      {/* <NavLink id="home-button" exact to="/">Tutor Base</NavLink> */}
      {signUpInOut()}
      {/* </ul> */}
    </nav>
  );
};

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
  };
}

export default withRouter(connect(mapStateToProps, { signoutUser })(Navbar));
