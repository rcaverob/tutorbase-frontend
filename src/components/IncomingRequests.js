/* eslint-disable */
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardActions,
  Button,
  Typography,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import {
  receiveTRequest,
  acceptRequest,
  declineRequest,
} from '../actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: 20,
  },
}));

const IncomingRequests = (props) => {
  useEffect(() => {
    if (!props.auth) props.history.push('/signin');
  });

  useEffect(() => {
    props.receiveTRequest();
  }, []);
  const classes = useStyles();

  function handleAccept(request) {
    const accept = {
      requestID: request.id,
      requesterID: request.requester.id,
    };

    props.acceptRequest(accept);
  }

  function handleDecline(request) {
    props.declineRequest(request.id);
  }

  const Requests = props.requests.map((request) => {
    return (
      <Card key={request._id} className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {request.type === 'tutors' ? 'Potential Tutee' : 'Potential Tutor'}
          </Typography>
          <Typography variant="h6" component="p">
            Class: {request.postID.department} {request.postID.class}
          </Typography>
          <Typography variant="h6" component="p">
            Requester: {request.requester.name}
          </Typography>
          <Typography variant="h6" component="p">
            Year: {request.requester.year}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              handleAccept(request);
            }}
          >
            Accept
          </Button>
          <Button
            size="small"
            onClick={() => {
              handleDecline(request);
            }}
          >
            Decline
          </Button>
        </CardActions>
      </Card>
    );
  });

  return (
    <>
      <Typography variant="h4">Incoming Requests</Typography>
      <Typography variant="h6" style={{ marginTop: '5px' }}>
        These people requested to be matched with you
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
    requests: reduxState.requests.incomingRequests,
    auth: reduxState.auth.authenticated,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    receiveTRequest,
    acceptRequest,
    declineRequest,
  })(IncomingRequests)
);
