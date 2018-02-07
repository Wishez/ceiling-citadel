import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import getClass from './../../constants/classes';
import BreadcrumbsContainer from './../BreadcrumbsContainer';


class BaseCatalogContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    CONSTANT: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    BRAND: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    COLLECTION: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    PRODUCT: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    CATEGORY: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    name: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    routes: PropTypes.array.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }


  componentWillReceiveProps(nextProps) {
    const {CONSTANT} = this.props;
    // Will be accuracy. 
    // There is CONSTANT constant in catalog's constants.
    if (!this.props[CONSTANT] && nextProps[CONSTANT]) {
      // console.log('will force update')
      this.forceUpdate();
    }
  }

  render() {        
    const {
      name,
      slogan,
      routes,
      children
    } = this.props;

    return (
      <div className={getClass({b: 'collection', add:'container'})}>
          <div className={getClass({b: 'catalogHeader', add: "parent row v-start h-centered"})}> 
            <h1 className={getClass({b: 'catalogHeader', el: "title", add: "parent row centered baseChild"})}>
              {name}
            </h1>
            <BreadcrumbsContainer routes={routes} />
            <p className={getClass({b: 'catalogHeader', el: "slogan", add: "parent row h-end  darkBlue baseChild"})}>
                {slogan}
            </p>
          </div>
          {children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {catalog} = state;
  return {
    ...catalog
  };
};

export default withRouter(connect(mapStateToProps)(BaseCatalogContainer));