import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getClass from './../../constants/classes';
import BreadcrumbsContainer from './../BreadcrumbsContainer';

class BaseCatalogContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    CONSTANT: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    name: PropTypes.string.isRequired,
    slogan: PropTypes.string,
    routes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    isProduct: PropTypes.bool,
    modifier: PropTypes.string
  }


  componentWillReceiveProps(nextProps) {
    const {CONSTANT} = this.props;

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
      <div className={
        getClass({
          b: 'catalog',
          m: modifier,
          add:'container parent column centered'
        })}>
        <div className='catalogHeader parent row v-centered h-centered'>
          <h1 className={
            getClass({
              b: 'catalogHeader',
              el: 'title',
              m: isProduct ? 'active' : '',
              add: 'parent row centered baseChild textCentered_xxs'
            })}>
            {name}
          </h1>
          <BreadcrumbsContainer routes={routes} />
          <p className={
            getClass({
              b: 'catalogHeader',
              el: 'slogan',
              m: modifier,
              add: 'parent row h-end  darkBlue baseChild'
            })}>
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
