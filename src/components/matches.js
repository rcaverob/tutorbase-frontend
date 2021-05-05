/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card, CardActions, Button, Typography, CardContent, Divider, Grid, // Container
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
// import { blue } from '@material-ui/core/colors';
import {
  receiveTRequest, acceptRequest, declineRequest, getMatches, fetchPost, clearMatches,
} from '../actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: 20,
  },
  container: {
    // backgroundColor: blue[100],
  },

}));


const Matche = (props) => {
  useEffect(() => {
    if (!props.auth) props.history.push('/signin');
  });

  useEffect(() => {
    props.receiveTRequest();
    props.getMatches();

    // You can uncomment the line below, in order to fix a crash upon pressing the Matches tab
    // props.clearMatches();
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
    console.log('Decline');
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
          <Button size="small" onClick={() => { handleAccept(request); }}>Accept</Button>
          <Button size="small" onClick={() => { handleDecline(request); }}>Decline</Button>
        </CardActions>
      </Card>
    );
  });

  const loadMatches = () => {
    if (props.matches1.matches) {
      const currentUser = props.matches1.id;
      const allMatches = props.matches1.matches.map((match) => {
        if (match.postID) {
          if (currentUser === match.requester.id) {
            return (
              <Card key={match._id} className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Class: {match.postID.department} {match.postID.class}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Requester: {match.userID.name}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    Year: {match.userID.year}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    Email: {match.userID.email}
                  </Typography>
                </CardContent>
              </Card>
            );
          } else {
            return (
              <Card key={match._id} className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Class: {match.postID.department} {match.postID.class}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Requester: {match.requester.name}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    Year: {match.requester.year}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    Email: {match.requester.email}
                  </Typography>
                </CardContent>
              </Card>
            );
          }
        } else {
          return <span key={match._id} />;
        }
      });
      return (
        <div>
          <Grid container spacing={24}>
            {allMatches}
          </Grid>
        </div>
      );
    } else {
      return <span />;
    }
  };

  return (
    <>
      <Divider />
      <Typography variant="h4"> Requests </Typography>
      <Grid container spacing={24}>
        {Requests}
      </Grid>
      <Divider />
      <Typography variant="h4"> Matches </Typography>
      {loadMatches()}
    </>


  );
};


function mapStateToProps(reduxState) {
  return {
    requests: reduxState.matches.requests,
    auth: reduxState.auth.authenticated,
    matches1: reduxState.matches.allMatches,
  };
}

export default withRouter(connect(mapStateToProps, {
  receiveTRequest, acceptRequest, declineRequest, getMatches, fetchPost, clearMatches,
})(Matche));
