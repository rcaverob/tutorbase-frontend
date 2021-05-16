/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Divider, Container, TextField } from '@material-ui/core';

import Carousel, { consts } from 'react-elastic-carousel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Post from './post';
import { fetchPosts, sendTRequest, getMyRequests } from '../actions/index';
import favicon from '../img/favicon.ico';
import PostCard from './PostCard';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 270,
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

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  useEffect(() => {
    if (!mode) {
      mode = 'tutors';
    }
    props.fetchPosts(mode, 'Grouped');
    if (props.auth) {
      props.getMyRequests();
    }
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
    return (
      post._id.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
      searchInPosts(searchString, post.people)
    );
  });

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
        return (
          post.user.name.toLowerCase().indexOf(searchString.toLowerCase()) !==
            -1 ||
          dept._id.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
        );
      } else return post;
    });
    const postItems = filteredStudents.map((post) => {
      curKey += 1;
      const buttonIsDisabled =
        props.requestedPostIDs.indexOf(post.postID) !== -1;
      return (
        <PostCard
          key={curKey}
          post={post}
          disabledButton={buttonIsDisabled}
          setPostModalInfo={setPostModalInfo}
          handleRequest={handleRequest}
        />
      );
    });

    return (
      <Container key={curKey}>
        <Typography variant="h4"> {dept._id} </Typography>
        <Carousel
          showArrows={!isSmallScreen}
          renderArrow={({ type, onClick }) => {
            return (
              <div
                className={classes.arrow}
                role="button"
                type="submit"
                tabIndex="0"
                onClick={onClick}
              >
                {type === consts.PREV ? '<' : '>'}
              </div>
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

      <Post
        open={modalOpen}
        handleRequest={handleRequest}
        handleClose={() => {
          editModal(false);
        }}
        buttonIsDisabled={props.requestedPostIDs.indexOf(currentPostID) !== -1}
        id={currentPostID}
        username={userName}
      />

      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Search"
          onChange={(event) => {
            changeSearch(event.target.value);
          }}
          value={searchString}
        />
      </form>
      {carousels}
    </div>
  );
};

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts.all,
    auth: reduxState.auth.authenticated,
    requestedPostIDs: reduxState.requests.requestedPostIDs,
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  sendTRequest,
  getMyRequests,
})(Posts);
