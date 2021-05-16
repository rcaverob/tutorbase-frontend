/* eslint-disable */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Modal,
  Typography,
  IconButton,
  Fade,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { fetchPost } from '../actions/index';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: '20px',
    backgroundColor: 'white',
    maxWidth: '800px',
    minWidth: '600px',
    borderRadius: '20px',
  },
  submitBtn: {
    borderRadius: '50px',
    color: 'white',
    background: (props) =>
      props.buttonIsDisabled
        ? 'gray'
        : 'linear-gradient(278.24deg, #46BAA4 2.24%, #70D27E 111.24%)',
  },
  backDrop: {
    background: 'rgba(0,255,255,0.2)',
  },
}));

const Post = (props) => {
  const classes = useStyles(props);
  const history = useHistory();

  useEffect(() => {
    if (props.open) props.fetchPost(props.id);
  }, [props.open]);

  const handleClick = () => {
    if (props.auth) {
      props.handleRequest(props.post.post.userID, props.post.post.id);
      props.handleClose();
    } else {
      props.handleClose();
      history.push('/signin');
    }
  };

  const setUserID = () => {
    if (props.post.post)
      return <Typography variant="h4">{props.username}</Typography>;
    else return <Typography variant="h4">Loading</Typography>;
  };

  const setAvailability = () => {
    if (props.post.post)
      return <Typography>{props.post.post.availability}</Typography>;
    else return <Typography />;
  };

  const setnotes = () => {
    if (props.post.post)
      return <Typography>{props.post.post.notes}</Typography>;
    else return <Typography>No notes</Typography>;
  };

  return (
    <Modal
      className={classes.modal}
      open={props.open}
      closeAfterTransition
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <Fade in={props.open}>
        <Grid
          container
          spacing={4}
          direction="column"
          justify="space-between"
          className={classes.modalBody}
        >
          <Grid
            item
            container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              xs={11}
              container
              spacing={2}
              direction="row"
              justify="flex-start"
            >
              <Grid
                item
                xs={9}
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                {setUserID()}
                {setAvailability()}
              </Grid>
            </Grid>
            <Grid item>
              <IconButton aria-label="close" onClick={props.handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid
              item
              container
              spacing={3}
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              {setnotes()}
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <Grid item>
                <Button
                  disabled={props.buttonIsDisabled}
                  variant="contained"
                  className={classes.submitBtn}
                  onClick={handleClick}
                >
                  <Typography>request</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

function mapStateToProps(reduxState) {
  return {
    post: reduxState.posts.current,
    auth: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, { fetchPost })(Post);
// export default Post;
