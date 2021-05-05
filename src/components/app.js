import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import axios from 'axios';
import '../style.scss';
import Landing from './landing';
import SideBar from './sideBar';
import Profile from './Profile';
import SignUp from './sign-up';
import SignIn from './sign-in';
import MyPosts from './myPosts';
import Matche from './matches';
import Tutors from './tutors';
import Tutees from './tutees';
import Fallback from './fallback';

// Comment one of the two out based on what you're using
// const ROOT_URL = 'http://localhost:9090/';
const ROOT_URL = 'https://tutorbase.herokuapp.com/api';

const UsersPosts = (props) => {
  return (
    <SideBar>
      {/* Your posts */}
      <MyPosts />
    </SideBar>
  );
};

const Matches = (props) => {
  return (
    <SideBar>
      {/* Matches */}
      <Matche />
    </SideBar>
  );
};

class App extends React.Component {
  componentDidMount() {
    axios.get(`${ROOT_URL}`)
      .then((response) => {
        console.log('response from TB server');
        console.log(response);
      })
      .catch((error) => {
        console.log('error in fetchPosts');
        console.log(error);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" render={() => <Landing pageNum={1} />} />
            <Route path="/tutors" component={Tutors} />
            <Route exact path="/tutees" component={Tutees} />
            <Route exact path="/posts" component={UsersPosts} />
            <Route exact path="/matches" component={Matches} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route component={Fallback} />
          </Switch>

        </div>
      </Router>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(App);
