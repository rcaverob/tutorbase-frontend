/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Paper, Typography, Button, makeStyles } from '@material-ui/core';
import { sendTRequest } from '../actions/index';

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    borderRadius: '50px',
    color: 'white',
    background: (clicked) =>
      clicked
        ? 'gray'
        : 'linear-gradient(278.24deg, #46BAA4 2.24%, #70D27E 111.24%)',
  },

  btnLink: {
    color: 'white',
    textDecoration: 'none',
  },
}));

const PostCard = (props) => {
  const [clicked, setClicked] = useState(false);
  const classes = useStyles(clicked);

  useEffect(() => {
    setClicked(props.disabledButton);
    return () => {};
  }, [props.disabledButton]);
  // Loads "Request" button and links based on auth (request and go to reqs if auth, otherwise login page)
  const requestButton = () => {
    return (
      <Button
        size="small"
        variant="contained"
        disabled={clicked}
        className={classes.submitBtn}
        onClick={
          props.auth
            ? () => {
                props.handleRequest(props.post.userID, props.post.postID);
                setClicked(true);
              }
            : null
        }
      >
        {props.auth ? (
          'Request'
        ) : (
          <Link to="/signin" className={classes.btnLink}>
            Request
          </Link>
        )}
      </Button>
    );
  };

  return (
    <Paper
      elevation={3}
      style={{ margin: '15px', padding: '10px', width: 'min(94vw, 250px)' }}
    >
      <div
        onClick={() => {
          props.setPostModalInfo(
            props.post.postID,
            props.post.user._id,
            props.post.user.name
          );
        }}
      >
        <Typography variant="h5" component="h2">
          {props.post.user.name}
        </Typography>
        <Typography variant="h6" component="h2">
          Year: {props.post.user.year}
        </Typography>
        <Typography variant="body2" component="p">
          Availability: {props.post.availability}
        </Typography>
      </div>
      <div>{requestButton()}</div>
    </Paper>
  );
};

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, { sendTRequest })(PostCard);
