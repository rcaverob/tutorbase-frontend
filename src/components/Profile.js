/* eslint-disable */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  TextField,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';

import DropDownMenu from './dropdownmenu';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  submitBtn: {
    borderRadius: '50px',
    background: 'linear-gradient(278.24deg, #46BAA4 2.24%, #70D27E 111.24%)',
    color: 'white',
  },
}));

const Profile = (props) => {
  const [value, setValue] = React.useState('female');
  const [value2, setEthncity] = React.useState('black');
  const [sport, setSport] = React.useState('');
  const [sportError, setSportError] = React.useState(false);

  const classes = useStyles();
  // const history = useHistory();
  useEffect(() => {
    if (!props.auth) props.history.push('/signin');
  });

  const sports = ['N/A', 'Baseball', 'Basketball', 'Heavyweight Crew'];

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleEthncity = (event) => {
    setEthncity(event.target.value);
  };
  const changeSport = (event) => {
    setSport(event.target.value);
    setSportError(false);
  };

  const handleClick = () => {};

  return (
    <div>
      <CssBaseline />
      <Typography variant="h3" gutterBottom>
        Finalize your profile!
      </Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Ethnicity</FormLabel>
        <RadioGroup
          aria-label="ethncity"
          name="ethnicity1"
          value={value2}
          onChange={handleEthncity}
        >
          <FormControlLabel
            value="black"
            control={<Radio />}
            label="African/African-American/Black"
          />
          <FormControlLabel
            value="asian"
            control={<Radio />}
            label="Asian/Pacific Islander/Asian-American"
          />
          <FormControlLabel
            value="hispanic"
            control={<Radio />}
            label="Hispanic/Latinx"
          />
          <FormControlLabel
            value="native"
            control={<Radio />}
            label="Native American"
          />
          <FormControlLabel
            value="white"
            control={<Radio />}
            label="White/Caucasian"
          />
          <FormControlLabel
            value="multi"
            control={<Radio />}
            label="Multiracial"
          />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <DropDownMenu
        error={sportError}
        label="Select Varsity Team"
        options={sports}
        value={sport}
        onChange={changeSport}
      />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Enter Greek Affiliation"
          variant="outlined"
        />
      </form>
      <Button
        variant="contained"
        className={classes.submitBtn}
        onClick={handleClick}
      >
        <Typography>Create Profile</Typography>
      </Button>
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
  };
}

export default withRouter(connect(mapStateToProps, null)(Profile));
