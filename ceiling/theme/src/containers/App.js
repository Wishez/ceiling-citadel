import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import 'index.sass'
// import Header from './../components/Header';
// import Footer from './../components/Footer';
// import Main from './../components/Main';


class App extends Component {
	componentDidMount() {
		
	}

  render() {
    return (
    	<div>
      	// <Header />
      	// <Main />	
      	// <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps)(App));