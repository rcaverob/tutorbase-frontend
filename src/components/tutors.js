import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from './sideBar';
import CreatePost from './createpost';
import Posts from './posts';

const useStyles = makeStyles((theme) => ({

  button: {
    color: 'white',
    backgroundColor: '#19AA6E',
    '&:hover': {
      backgroundColor: '#747785',
    },
    borderRadius: '25px',
  },
}));

const Tutors = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const requestFormButton = () => {
    console.log(props.auth);
    return (props.auth
      ? (<Button className={classes.button} onClick={() => { setOpen(true); }} variant="contained">Get a Tutee</Button>)
      : <Button className={classes.button} onClick={() => { props.history.push('/signin'); }} variant="contained">Get a Tutee</Button>);
  };

  return (
    <div>
      <SideBar>
        <div>
          <h1>We help students with their learning</h1>
          {requestFormButton()}
          <CreatePost isTutor open={open} handleClose={() => { setOpen(false); }} />
        </div>
        <Posts isTutor mode="tutors" />
      </SideBar>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
  };
}

export default withRouter(connect(mapStateToProps, null)(Tutors));
