import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Route} from 'react-router-dom'; 

// import Fading from './../components/Animation/Fading';
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
          
              <Route path="/" exact component={MainPageContainer} />
              <Route path="/catalog" component={CatalogRoutes} />
              <Route path="/contacts" component={ContactsContainer} />
              <Route path="/service" component={ServiceContainer} />
          
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

export default connect(mapStateToProps)(MainRoutes);