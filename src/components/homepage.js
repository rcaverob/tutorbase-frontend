/* eslint-disable */

import { NavLink } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Navbar from './navbar';
import background from '../img/baker.jpg';

const useStyles = makeStyles((theme) => ({
  fullScreen: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    margin: '0px',
  },
  brandTitleContainer: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  brandTitle: {
    fontFamily: 'Yellowtail',
    fontSize: '240px',
    fontWeight: 'normal',
    display: 'inline',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    color: '#fbfbfb',
    textShadow: '4px 4px #333',

    [theme.breakpoints.down('md')]: {
      fontSize: '190px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '160px',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0px',
      fontSize: '130px',
      display: 'block',
    },
  },
  brandStart: {
    marginLeft: '-0.2em',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-0.9em',
    },
  },
  brandEnd: {
    position: 'relative',
    top: '0.28em',
    marginLeft: '-0.12em',
    [theme.breakpoints.down('xs')]: {
      marginTop: '-0.8em',
      marginLeft: '0.6em',
    },
  },
  subtitle: {
    textShadow: '2px 2px 3px #333',
    color: '#fbfbfb',
    [theme.breakpoints.down('xs')]: {
      fontSize: '22px',
    },
  },
  navTop: {
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      alignSelf: 'flex-start',
    },
  },
  navBottom: {
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      alignSelf: 'flex-end',
    },
  },
  midSection: {
    width: '550px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    [theme.breakpoints.down('xs')]: {
      color: 'purple',
      alignItems: 'center',
      width: 'auto',
    },
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
    textTransform: 'lowercase',
    fontSize: '1.5rem',
  },

  '@global': {
    p: {
      fontSize: '24px',
    },
    h2: {
      fontSize: '36px',
      fontWeight: 'normal',
    },
  },
}));

function HomePage(props) {
  const classes = useStyles();

  return (
    <section className={classes.fullScreen}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <div className={classes.brandTitleContainer}>
          <h1 className={`${classes.brandTitle} ${classes.brandStart}`}>
            Tutor
          </h1>
          <h1 className={`${classes.brandTitle} ${classes.brandEnd}`}>Base</h1>
        </div>
        <div
          style={{
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '15px',
            textAlign: 'center',
          }}
        >
          <p className={classes.subtitle}>
            TutorBase tenacisously touts tutors to tutees and tutees to tutors.
          </p>
        </div>
      </div>
      <div className={classes.midSection}>
        <NavLink to="/tutors" className={classes.navTop}>
          <Button
            className={classes.btnTo}
            variant="contained"
            color="primary"
            size="large"
          >
            Find Tutors
          </Button>
        </NavLink>
        <h2
          style={{
            alignSelf: 'center',
            color: '#fbfbfb',
            textShadow: '2px 2px 3px #333',
            margin: '4px',
          }}
        >
          or...
        </h2>
        <NavLink to="/tutees" className={classes.navBottom}>
          <Button
            className={classes.btnTe}
            variant="contained"
            color="primary"
            size="large"
          >
            Find Tutees
          </Button>
        </NavLink>
      </div>
      <div
        style={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ height: '10px' }} />
        <Navbar />
        <KeyboardArrowDownIcon
          style={{ fontSize: 64, color: '#262B40' }}
          onClick={props.handlePageDown}
        />
      </div>
    </section>
  );
}

export default HomePage;
