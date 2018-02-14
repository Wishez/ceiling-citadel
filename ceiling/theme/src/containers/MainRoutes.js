import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'; 

import getClass from './../constants/classes';

import MainPageContainer from './MainPageContainer';
import ContactsContainer from './ContactsContainer';
import ServiceContainer from './ServiceContainer';
import CatalogRoutes from './Catalog/CatalogRoutes';

class MainRoutes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  componentDidMount() {

  }

  render() {        


    return (
      <main id="main" className={getClass({b: 'main'})}>
          <Switch>
              <Route path="/" exact component={MainPageContainer} />
              <Route path="/catalog" component={CatalogRoutes} />
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