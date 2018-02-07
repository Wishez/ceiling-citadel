import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'; 

// import Fading from './../components/Animation/Fading';
import getClass from './../constants/classes';

import MainPageContainer from './MainPageContainer';
import ContactsContainer from './ContactsContainer';
import ServiceContainer from './ServiceContainer';
import CatalogRoutes from './Catalog/CatalogRoutes';
import CatalogPageContainer from './Catalog/CatalogPageContainer';

import BrandContainer from './Catalog/BrandContainer';
import CategoryContainer from './Catalog/CategoryContainer';
import BrandCategoryContainer from './Catalog/BrandCategoryContainer';
import ProductContainer from './Catalog/ProductContainer';
class MainRoutes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  componentDidMount() {

  }

  render() {        
    const catalogSubroutes = [
      { path: '/catalog/brand/:brandSlug',
        component: BrandContainer
      },
      { path: '/catalog/category/:categorySlug',
        component: CategoryContainer
      },
      { path: '/catalog/collection/:collectionSlug',
        component: ProductContainer
      }
    ];

    return (
      <main id="main" className={getClass({b: 'main'})}>
          <Switch>
              <Route path="/" exact component={MainPageContainer} />
              <Route path="/catalog" component={CatalogRoutes}>
                  {/*catalogSubroutes.map((route, index) => (
                        <Route key={index} path={route.path} render={props => (
                            <route.component {...props} />
                        )} />
                  ))*/}
              </Route>
              <Route path="/contacts" component={ContactsContainer} />
              <Route path="/service" component={ServiceContainer} />
          </Switch>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { catalog } = state;

  return {
    ...catalog
  }
};

export default withRouter(connect(mapStateToProps)(MainRoutes));