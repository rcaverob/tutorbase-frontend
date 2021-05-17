/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Posts from './posts';
import SideBar from './sideBar';
import CreatePost from './createpost';

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'white',
    background: '#19AA6E',
    '&:hover': {
      background: '#747785',
    },
    borderRadius: '25px',
  },
}));

const Tutees = (props) => {
  const [newPost, setNewPost] = React.useState(false);

  const requestFormButton = () => {
    const classes = useStyles();
    return props.auth ? (
      <Button
        className={classes.button}
        onClick={() => {
          setNewPost(true);
        }}
        variant="contained"
      >
        Get a Tutor
      </Button>
    ) : (
      <Button variant="contained" onClick={props.history.push('/signin')}>
        Get a Tutor
      </Button>
    );
  };

  return (
    <div>
      <SideBar>
        <div>
          <h1>We need help learning</h1>
          {requestFormButton()}
          <CreatePost
            open={newPost}
            handleClose={() => {
              setNewPost(false);
            }}
            isTutor={false}
          />
        </div>
        <Posts mode="tutees" />
      </SideBar>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
  };
}

export default withRouter(connect(mapStateToProps, null)(Tutees));
