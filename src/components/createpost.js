/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
  Fade,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import DropdownMenu from './dropdownmenu';
import { addPost } from '../actions';
import classdata from '../data/classdata.json'; // Data for all classes that are permitted to have tutors in 20S

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    maxWidth: '800px',
    minWidth: '600px',
    borderRadius: '20px',
  },
  modalHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  formItem: {
    padding: '5px 0px',
  },
  submitBtn: {
    borderRadius: '50px',
    background: 'linear-gradient(278.24deg, #46BAA4 2.24%, #70D27E 111.24%)',
    color: 'white',
  },
}));

const CreatePost = (props) => {
  const [department, setDepartment] = useState('');
  const [classNum, setClassNum] = React.useState('');
  const [availability, setAvailability] = useState('');
  const [notes, setNotes] = useState('');
  const [deptError, setDeptError] = useState(true);
  const [classError, setClassError] = useState(true);
  const [availError, setAvailError] = useState(true);

  useEffect(() => {
    if (department === '') setDeptError(true);
    else setDeptError(false);
  }, [department]);

  useEffect(() => {
    if (classNum === '' || classNum === 'Select a department')
      setClassError(true);
    else setClassError(false);
  }, [classNum]);

  useEffect(() => {
    if (availability === '') setAvailError(true);
    else setAvailError(false);
  }, [availability]);

  const classes = useStyles();

  const title = props.isTutor ? (
    <Typography variant="h4">Request a Tutee</Typography>
  ) : (
    <Typography variant="h3">Request a Tutor</Typography>
  );

  const changeDepartment = (event) => {
    setDepartment(event.target.value);
    setClassNum('');
  };

  const handleClick = () => {
    const noErrors = !deptError && !classError && !availError;
    const postType = props.isTutor ? 'tutors' : 'tutees';
    if (noErrors) {
      const post = {
        type: props.isTutor ? 'tutor' : 'tutee',
        department,
        class: classNum,
        availability,
        notes,
        responses: [],
      };
      props.addPost(post, postType);
      props.handleClose();
    }
  };

  return (
    <Modal className={classes.modal} open={props.open} closeAfterTransition>
      <Fade in={props.open}>
        <div className={classes.modalBody}>
          <div className={classes.modalHeader}>
            {title}
            <IconButton aria-label="close" onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.modalBody}>
            <Grid
              container
              spacing={3}
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                container
                spacing={3}
                direction="row"
                alignItems="center"
                className={classes.formItem}
              >
                <Grid item>
                  <Typography variant="h5">Department:</Typography>
                </Grid>
                <Grid item xs={5}>
                  <DropdownMenu
                    error={deptError}
                    label="Select Department"
                    options={classdata.departments}
                    value={department}
                    onChange={changeDepartment}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                className={classes.formItem}
              >
                <Grid item>
                  <Typography variant="h5">Class:</Typography>
                </Grid>
                <Grid item xs={5}>
                  <DropdownMenu
                    error={classError}
                    label="Select Class"
                    options={
                      department === ''
                        ? ['Select a department first']
                        : classdata.classes[department]
                    }
                    value={classNum}
                    onChange={(event) => {
                      setClassNum(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                className={classes.formItem}
              >
                <Grid item>
                  <Typography variant="h5">Availability:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    error={availError}
                    label="Availability"
                    placeholder="(e.g. 'After 10As' or 'Sundays before 4pm')"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={availability}
                    onChange={(event) => {
                      setAvailability(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                className={classes.formItem}
              >
                <Grid item>
                  <Typography variant="h5">Notes: </Typography>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    label="Notes"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={4}
                    value={notes}
                    onChange={(event) => {
                      setNotes(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justify="flex-end"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    className={classes.submitBtn}
                    onClick={handleClick}
                  >
                    <Typography>post request</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default connect(null, { addPost })(CreatePost);
