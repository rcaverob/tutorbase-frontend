import { NavLink } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Navbar from './navbar';
import logo from '../img/logo.png';
import background from '../img/baker.png';

const useStyles = makeStyles((theme) => ({
  stickBottom: {
    marginTop: '100px',
  },
  fullScreen: {
    size: '100%',
    minHeight: '100vh',
    minWidth: '100vw',

    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    margin: '0px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnTo: {
    background: 'linear-gradient(106.99deg, #70D27E 5.51%, #46BAA4 80.88%)',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
    width: '238px',
    height: '56px',
    borderRadius: '71px',
    marginRight: '300px',
    textTransform: 'lowercase',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  btnTe: {
    background: 'linear-gradient(106.99deg, #70D27E 5.51%, #46BAA4 80.88%)',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
    width: '238px',
    height: '56px',
    borderRadius: '71px',
    marginLeft: '300px',
    marginBottom: '200px',
    textTransform: 'lowercase',
    fontSize: '1.5rem',
  },

  '@global': {
    p: {
      fontSize: '24px',
    },
    h1: {
      fontSize: '36px',
      fontWeight: 'normal',
    },
  },

}));


function HomePage(props) {
  const classes = useStyles();

  return (
    <div className={classes.fullScreen}>
      <main className={classes.content}>
        <img src={logo} alt="Tutor Base" width="864px" height="401px" />
        <p>tutorbase tenacisously touts tutors to tutees and tutees to tutors</p>
        <NavLink to="/tutors" style={{ textDecoration: 'none' }}>
          <Button className={classes.btnTo} variant="contained" color="primary" size="large">
            Find Tutors
          </Button>
        </NavLink>
        <h1>or...</h1>
        <NavLink to="/tutees" style={{ textDecoration: 'none' }}>
          <Button className={classes.btnTe} variant="contained" color="primary" size="large">
            Find Tutees
          </Button>
        </NavLink>
        <Navbar />
      </main>
      <Grid container direction="column" justiy="center" alignItems="center">
        <Grid item>
          <KeyboardArrowDownIcon style={{ fontSize: 64, color: '#262B40' }} className={classes.stickBottom} onClick={props.handlePageDown} />
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
