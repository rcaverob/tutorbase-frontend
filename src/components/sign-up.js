import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStyles from 'react-jss';
import { signupUser } from '../actions';

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
  signUp: {
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

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEmail: '',
      editPassword: '',
      editName: '',
      editYear: '',
      error: '',
    };
  }

  signUp = (event) => {
    event.preventDefault(); // prevent page reload on submit
    const NewUser = {
      name: this.state.editName,
      year: this.state.editYear,
      email: this.state.editEmail,
      password: this.state.editPassword,
    };
    // handle errors on the front end
    if (!this.state.editName || !this.state.editYear || !this.state.editEmail || !this.state.editPassword || !this.state.editEmail.toLowerCase().includes('@dartmouth.edu')) {
      this.setState({ error: 'You must provide a unique Dartmouth email address and password, as well as a name and year.' });
    } else {
      this.props.signupUser(NewUser, this.props.history);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.page}>
        <form className={classes.signUp}>
          <h1>Sign up!</h1>
          <p className={classes.error}>{this.state.error}</p>
          <div className={classes.section}>
            <p>Name</p>
            <input onChange={(event) => { this.setState({ editName: event.target.value }); }} value={this.state.editName} />
          </div>
          <div className={classes.section}>
            <p>Year</p>
            <input type="number" onChange={(event) => { this.setState({ editYear: event.target.value }); }} value={this.state.editYear} />
          </div>
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
            <button onClick={this.signUp} type="button" tabIndex={0}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(withStyles(styles)(SignUpForm)));
