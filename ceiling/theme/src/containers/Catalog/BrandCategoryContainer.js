import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Route} from 'react-router-dom'; 
import getClass from './../../constants/classes';

class BrandCategoryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
  componentDidMount() {
    
  }

  render() {        
    return (
      <div className={getClass({b: 'brandCategory'})}>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const { catalog } = state;

  return {
    ...catalog
  }
};

export default withRouter(connect(mapStateToProps)(BrandCategoryContainer));