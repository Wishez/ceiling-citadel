import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



import CatalogPageContainer from './CatalogPageContainer';
import BrandContainer from './BrandContainer';
import CategoryContainer from './CategoryContainer';
import BrandCollectionContainer from './BrandCollectionContainer';
import CategoryCollectionContainer from './CategoryCollectionContainer';
import BrandProductContainer from './BrandProductContainer';
import CategoryProductContainer from './CategoryProductContainer';

import MyRoute from '@/components/MyRoute';

import getClass from '@/constants/classes';
import { selectNavigationItem } from '@/actions/navigationActions.js';
import { initNavigationState } from '@/reducers/navigation.js';

class CatalogRoutes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(selectNavigationItem(initNavigationState.secondNavItem.index));

    this.forceUpdate();
    
    if (!document.title)
      document.title = 'Каталог | ArtCeil';
  }


  render() {
    const {
      url
    } = this.props.match;
    const {
      location
    } = this.props;

    return (
      <div className={getClass({b: 'catalog'})}>
        <Switch location={location}>
          <MyRoute path={`${url}/brand/:brandSlug/:collectionSlug/:productSlug`} component={BrandProductContainer} />
          <MyRoute path={`${url}/brand/:brandSlug/:collectionSlug`} component={BrandCollectionContainer} />
          <MyRoute path={`${url}/brand/:brandSlug`} component={BrandContainer} />
          <MyRoute path={`${url}/category/:categorySlug/:collectionSlug/:productSlug`} component={CategoryProductContainer} />
          <MyRoute path={`${url}/category/:categorySlug/:collectionSlug`} component={CategoryCollectionContainer} />
          <MyRoute path={`${url}/category/:categorySlug`} component={CategoryContainer} />
          <MyRoute path={`${url}`} component={CatalogPageContainer} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { catalog } = state;

  return {
    ...catalog
  };
};

export default withRouter(connect(mapStateToProps)(CatalogRoutes));
