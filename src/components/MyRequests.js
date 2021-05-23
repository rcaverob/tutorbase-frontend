/* eslint-disable */

import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import {
  Card,
  Typography,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { getMyRequests } from '../actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: 20,
  },
}));

const MyRequests = (props) => {
  useEffect(() => {
    if (!props.auth) props.history.push('/signin');
  });

  useEffect(() => {
    props.getMyRequests();
  }, []);
  const classes = useStyles();

  const Requests = props.requests.map((request) => {
    return (
      <Card key={request._id} className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {request.type === 'tutors' ? 'Potential Tutor' : 'Potential Tutee'}
          </Typography>
          <Typography variant="h6" component="p">
            Class: {request.postID.department} {request.postID.class}
          </Typography>
          <Typography variant="h6" component="p">
            Name: {request.userID.name}
          </Typography>
          <Typography variant="h6" component="p">
            Year: {request.userID.year}
          </Typography>
        </CardContent>
      </Card>
    );
  });

  return (
    <>
      <Typography variant="h4">Pending Requests</Typography>
      <Typography variant="h6" style={{ marginTop: '5px' }}>
        These are the requests you made
      </Typography>
      <Divider style={{ margin: 5 }} />
      <Grid container spacing={1}>
        {Requests}
      </Grid>
    </>
  );
};

function mapStateToProps(reduxState) {
  return {
    requests: reduxState.requests.myRequests,
    auth: reduxState.auth.authenticated,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    getMyRequests,
  })(MyRequests)
);
