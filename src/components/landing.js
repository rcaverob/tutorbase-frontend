import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import About from './about';
import HomePage from './homepage';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.aboutRef = React.createRef();
    this.homeRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.pageNum === 1) this.goAboutPage();
  }

  goHomePage = () => {
    this.homeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  goAboutPage = () => {
    this.aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <div>
        <div ref={this.homeRef}>
          <HomePage key={0} handlePageDown={this.goAboutPage} />
        </div>
        <span ref={this.aboutRef}>
          <About handlePageUp={this.goHomePage} />
        </span>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(LandingPage));
