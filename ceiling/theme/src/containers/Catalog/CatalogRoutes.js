import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom'; 

import getClass from './../../constants/classes';

import CatalogPageContainer from './CatalogPageContainer';
import BrandContainer from './BrandContainer';
import CategoryContainer from './CategoryContainer';
import BrandCollectionContainer from './BrandCollectionContainer';
import CategoryCollectionContainer from './CategoryCollectionContainer';
import BrandProductContainer from './BrandProductContainer';
import CategoryProductContainer from './CategoryProductContainer';

import { 
  fetchCatalogEntityOrGetLocale
} from './../../actions/catalog';
import MyRoute from './../../components/MyRoute';

import { selectNavigationItem } from './../../actions/navigationActions.js'; 
import { initNavigationState } from './../../reducers/navigation.js';

import {localData} from './../../constants/pureFunctions';

class CatalogRoutes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }
  componentDidMount() {
    const { dispatch } = this.props;

    
    // dispatch(tryFetchCatalog());
    dispatch(selectNavigationItem(initNavigationState.secondNavItem.index));
    
    this.forceUpdate();
    if (!document.title)
      document.title = 'Каталог | ArtCeil';
  }


  render() {
    const { 
      url
    } = this.props.match;
    
    return (
      <section className={getClass({b: 'catalog'})}>
        <Switch >
          <MyRoute path={`${url}/brand/:brandSlug/:collectionSlug/:productSlug`} component={BrandProductContainer} />
          <MyRoute path={`${url}/brand/:brandSlug/:collectionSlug`} component={BrandCollectionContainer} />
          <MyRoute path={`${url}/brand/:brandSlug`} component={BrandContainer} />
          <MyRoute path={`${url}/category/:categorySlug/:collectionSlug/:productSlug`} component={CategoryProductContainer} />
          <MyRoute path={`${url}/category/:categorySlug/:collectionSlug`} component={CategoryCollectionContainer} />
          <MyRoute path={`${url}/category/:categorySlug`} component={CategoryContainer} />
          <MyRoute path={`${url}`} component={CatalogPageContainer} />
        </Switch>
      </section>
    );
  }
}
// <TransitionGroup
//             component="div"
//             classNames={{
//               enter: getClass({b: 'translate', m: "enter"}),
//               enterActive: getClass({b: 'translate', m: "enterActive"}),
//               leave: getClass({b: 'translate', m: "leave"}),
//               leaveActive: getClass({b: 'translate', m: "leaveActive"})
//             }}
//             timeout={{
//                enter: 500,
//                exit: 500,
//             }}
//         >
// </TransitionGroup>
const mapStateToProps = state => {
  const { catalog } = state;

  return {
    ...catalog
  };
};

export default withRouter(connect(mapStateToProps)(CatalogRoutes));
