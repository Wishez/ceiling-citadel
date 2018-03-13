import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getClass from './../../constants/classes';
import BreadcrumbsContainer from './../BreadcrumbsContainer';
import {CATALOG} from './../../constants/catalog';
import {localData} from './../../constants/pureFunctions';

import Loader from './../../components/Loader';

class BaseCatalogContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    CONSTANT: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    BRAND: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    COLLECTION: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    PRODUCT: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    CATEGORY: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    name: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    routes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    isProduct: PropTypes.bool,
    modifier: PropTypes.string
  }
  

  componentWillReceiveProps(nextProps) {
    const {CONSTANT} = this.props;
    // Will be accuracy. 
    // There is CONSTANT constant in catalog's constants.
    if (!this.props[CONSTANT] && nextProps[CONSTANT]) {
      this.forceUpdate();
    }
  }
  render() {        
  
    const {
      name,
      slogan,
      routes,
      children,
      isProduct,
      modifier
    } = this.props;

    return (
      <div className={getClass({b: 'catalog', m: modifier, add:'container parent column centered'})}>
        <div className={getClass({b: 'catalogHeader', add: 'parent row v-start h-centered'})}> 
          <h1 className={getClass({b: 'catalogHeader', el: 'title', m: isProduct ? 'active' : '', add: 'parent row centered baseChild'})}>
            {name}
          </h1>
          <BreadcrumbsContainer routes={routes} />
          <p className={getClass({b: 'catalogHeader', el: 'slogan', m: modifier, add: 'parent row h-end  darkBlue baseChild'})}>
            {slogan}
          </p>
        </div>
        {children}
      </div>
    );
  }
}
// ? children : <Loader />}

const mapStateToProps = state => {
  const {catalog} = state;
  return {
    ...catalog
  };
};

export default withRouter(connect(mapStateToProps)(BaseCatalogContainer));
