/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Paper, Typography, Button, Divider, Container, TextField,
} from '@material-ui/core';

import Carousel, { consts } from 'react-elastic-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Post from './post';
// import { blue } from '@material-ui/core/colors';
import { fetchPosts, sendTRequest } from '../actions/index';
import favicon from '../img/favicon.ico';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
  },
  arrow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    fontSize: '50px',
    cursor: 'pointer',
    outline: 'none',
  },
  container: {
    // backgroundColor: blue[100],
  },
  submitBtn: {
    borderRadius: '50px',
    background: 'linear-gradient(278.24deg, #46BAA4 2.24%, #70D27E 111.24%)',
    color: 'white',
  },
  btnLink: {
    textDecoration: 'none',
    color: 'white',
  },
  carousel: {
    border: 'none',
  },

}));

const Posts = (props) => {
  let [mode] = useState(props.mode);
  const [currentPostID, setPostID] = useState(0);
  const [userName, setUserName] = useState('none');
  const [modalOpen, editModal] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [breakPoints] = useState([
    { width: 1, itemsToShow: 1 },
    { width: 620, itemsToShow: 2 },
    { width: 950, itemsToShow: 3 },
  ]);
  useEffect(() => {
  // Your code here
    if (!mode) {
      mode = 'tutors';
    }
    props.fetchPosts(mode, 'Grouped');
  }, []);

  function changeSearch(val) {
    setSearchString((str) => val);
  }

  const classes = useStyles();


  function handleRequest(userID, postID) {
    const reqType = props.isTutor ? 'tutors' : 'tutees';


    const request = {
      userID,
      type: reqType,
      postID,
    };

    props.sendTRequest(request, reqType);
  }

  const searchInPosts = (str, postArray) => {
    let match = false;
    postArray.forEach((post) => {
      if (post.user.name) {
        if (post.user.name.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
          match = true;
        }
      }
    });
    return match;
  };

  const filteredPosts = props.posts.filter((post) => {
    return (post._id.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) || searchInPosts(searchString, post.people);
  });


  // Loads "Request" button and links based on auth (request and go to reqs if auth, otherwise login page)
  const requestButton = (post) => {
    return (props.auth
      ? (<Button size="small" variant="contained" className={classes.submitBtn} onClick={() => { handleRequest(post.userID, post.postID); }}>Request</Button>)
      : (<Button size="small" variant="contained" className={classes.submitBtn}><Link to="/signin" className={classes.btnLink}>Request</Link></Button>));
  };

  const setPostModalInfo = (postID, username) => {
    setPostID(postID);
    setUserName(username);
    editModal(true);
  };

  let curKey = 0;
  const carousels = filteredPosts.map((dept) => {
    curKey += 1;
    const filteredStudents = dept.people.filter((post) => {
      if (post && post.user.name) {
        return (post.user.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 || dept._id.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
      } else return post;
    });
    const postItems = filteredStudents.map((post) => {
      // console.log('post');
      // console.log(post);
      curKey += 1;
      return (
        <Paper elevation={3} style={{ margin: '20px', padding: '10px' }} key={curKey} className={classes.root}>
          <div onClick={() => { setPostModalInfo(post.postID, post.user.name); }}>
            <Typography variant="h5" component="h2">
              {post.user.name}
            </Typography>
            <Typography variant="h6" component="h2">
              Year: {post.user.year}
            </Typography>
            <Typography variant="body2" component="p">
              Availability: {post.availability}
            </Typography>
          </div>
          <div>
            {requestButton(post)}
          </div>
        </Paper>
      );
    });
    return (
      <Container className={classes.container} key={curKey}>
        <Typography variant="h4"> {dept._id} </Typography>
        <Carousel
          renderArrow={({ type, onClick }) => {
            console.log('type');
            console.log(type);
            return (
              <div className={classes.arrow} role="button" type="submit" tabIndex="0" onClick={onClick}>{type === consts.PREV ? '<' : '>'}</div>
            );
          }}
          pagination={false}
          breakPoints={breakPoints}
          className={classes.carousel}
        >
          {postItems}
        </Carousel>
        <Divider />
      </Container>
    );
  });

  return (
    <div>
      <img src={favicon} alt="" style={{ display: 'none' }} />

      <Post open={modalOpen} handleRequest={handleRequest} handleClose={() => { editModal(false); }} id={currentPostID} username={userName} />

      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Search" onChange={(event) => { changeSearch(event.target.value); }} value={searchString} />
      </form>
      {carousels}
    </div>
  );
};


function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts.all,
    auth: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, { fetchPosts, sendTRequest })(Posts);
