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

import { getMatches, clearMatches } from '../actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: 20,
  },
}));

const Matches = (props) => {
  useEffect(() => {
    if (!props.auth) props.history.push('/signin');
  });

  useEffect(() => {
    props.getMatches();
  }, []);
  const classes = useStyles();

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
          <Grid container spacing={1}>
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
      <Typography variant="h4">Your Matches </Typography>
      <Typography variant="h6" style={{ marginTop: '5px' }}>
        These are your confirmed matches
      </Typography>
      <Divider style={{ margin: 5 }} />
      {loadMatches()}
    </>
  );
};

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
    matches1: reduxState.matches.allMatches,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    getMatches,
    clearMatches,
  })(Matches)
);
