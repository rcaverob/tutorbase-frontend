import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import {
  Card, CardActions, Button, Typography, CardContent, Divider, Grid, // Container
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
// import { blue } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import { fetchMyPosts, deletePost } from '../actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: 20,
  },
  container: {
    // backgroundColor: blue[100],
  },

}));

const MyPosts = (props) => {
  useEffect(() => {
    if (!props.auth) props.history.push('/signin');
    props.fetchMyPosts('tutors');
    props.fetchMyPosts('tutees');
  }, []);
  const classes = useStyles();

  function handleDelete(id) {
    console.log(id);
    props.deletePost(id);
  }

  const tutorPosts = props.tutors.map((post) => {
    // console.log(`Post is: ${post}`);
    return (
      <Card key={post._id} className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Department: {post.department}
          </Typography>
          <Typography variant="h5" component="h2">
            Class: {post.class}
          </Typography>
          <Typography variant="body2" component="p">
            Availability: {post.availability}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => { handleDelete(post._id); }}>Delete</Button>
        </CardActions>
      </Card>
    );
  });

  const tuteePosts = props.tutees.map((post) => {
    console.log(`Post is: ${post}`);
    return (
      <Card key={post._id} className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Department: {post.department}
          </Typography>
          <Typography variant="h5" component="h2">
            Class: {post.class}
          </Typography>
          <Typography variant="body2" component="p">
            Availability: {post.availability}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => { handleDelete(post.id); }}>Delete</Button>
        </CardActions>
      </Card>
    );
  });

  return (
    <>
      <Typography variant="h4"> Tutor Posts </Typography>
      <Grid container spacing={24}>
        {tutorPosts}
      </Grid>
      <Divider />
      <Typography variant="h4"> Tutee Posts </Typography>
      <Grid container spacing={24}>
        {tuteePosts}
      </Grid>
    </>
  );
};


function mapStateToProps(reduxState) {
  return {
    tutors: reduxState.myPosts.tutors,
    tutees: reduxState.myPosts.tutees,
    auth: reduxState.auth.authenticated,
  };
}

export default withRouter(connect(mapStateToProps, { fetchMyPosts, deletePost })(MyPosts));
