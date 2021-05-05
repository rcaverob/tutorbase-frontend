import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import withStyles from 'react-jss';
import { signinUser } from '../actions';

const styles = {
  page: {
    background: '#F7F7F8',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '500px',
  },
  signIn: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.25)',
    borderTop: 'solid 15px #19AA6E',
  },
  deleteSubmit: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '250px',
  },
  link: {
    color: '#19AA6E',
  },
  error: {
    color: '#CD5C5C',
    marginTop: 0,
  },
  '@global': {
    input: {
      width: '400px',
      height: '26px',
    },
    h1: {
      color: '#19AA6E',
    },
    p: {
      fontWeight: 'bold',
      color: '#262B40',
    },
    button: {
      background: 'white',
      color: '#19AA6E',
      padding: '5px',
      border: 'solid 1px #19AA6E',
      borderRadius: 3,
      width: '120px',
      height: '30px',
      fontWeight: 'bold',
      '&:hover': {
        background: '#19AA6E',
        color: 'white',
      },
    },
  },
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEmail: '',
      editPassword: '',
      error: '',
    };
  }

  signIn = (event) => {
    if (!this.state.editPassword || !this.state.editEmail) this.setState({ error: 'Please provide an email and password to sign in!' });
    else if (!this.state.editEmail.toLowerCase().includes('@dartmouth.edu')) this.setState({ error: 'Users must have a valid dartmouth.edu email' });
    else {
      event.preventDefault(); // prevent page reload on submit
      const User = {
        email: this.state.editEmail,
        password: this.state.editPassword,
      };
      this.props.signinUser(User, this.props.history);
      if (!this.props.auth && this.props.authError) this.setState({ error: 'Invalid Credentials' });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.page}>
        <form className={classes.signIn}>
          <h1>Sign in!</h1>
          <p className={classes.error}>{this.state.error}</p>
          <div className={classes.section}>
            <p>Email</p>
            <input onChange={(event) => { this.setState({ editEmail: event.target.value }); }} value={this.state.editEmail} />
          </div>
          <div className={classes.section}>
            <p>Password</p>
            <input type="password" onChange={(event) => { this.setState({ editPassword: event.target.value }); }} value={this.state.editPassword} />
          </div>
          <div className={classes.deleteSubmit}>
            <button onClick={() => { this.props.history.push('/'); }} type="button" tabIndex={0}>Back</button>
            <button onClick={this.signIn} type="button" tabIndex={0}>Submit</button>
          </div>
        </form>
        <p>Don&#39;t have an account? <Link to="/signup" className={classes.link}> Sign up!</Link></p>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
    authError: reduxState.auth.authError,
  };
}

export default withRouter(connect(mapStateToProps, { signinUser })(withStyles(styles)(SignInForm)));
