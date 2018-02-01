import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import HeaderContainer from './HeaderContainer';
// import Footer from './../components/Footer';
// import Main from './../components/Main';
import './../tests/cart';

class App extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <HeaderContainer />    
      </div>
    );
  }
}

      	// <Main />	
      	// <Footer />
const mapStateToProps = state => {
  console.log(state);
  
  return {}
};

export default withRouter(connect(mapStateToProps)(App));