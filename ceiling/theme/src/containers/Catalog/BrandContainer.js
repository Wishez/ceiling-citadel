import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Route} from 'react-router-dom'; 


import {CATALOG, BRAND} from './../../constants/catalog';
import getClass from './../../constants/classes';
import {localData} from './../../constants/pureFunctions.js';

import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';
// import CatalogSection from './../../components/CatalogSection';

class BrandContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  }
  state = {
    id: ''
  }
  componentDidMount() {
    const {brandSlug} = this.porps.match;
    const catalog = localData.get(CATALOG);
    const id = catalog.brnads[brandSlug];
    this.setState({id});
    
  }

  render() {      
    const {dispatch} = this.props;
    const brand = dispatch(fetchCatalogEntityOrGetLocale(BRAND, id))

    return (
      <div className={getClass({b: 'brand'})}>

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

export default withRouter(connect(mapStateToProps)(BrandContainer));