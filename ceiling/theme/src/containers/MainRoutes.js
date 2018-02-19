import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom'; 
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import getClass from './../constants/classes';

import MainPageContainer from './MainPageContainer';
import ContactsContainer from './ContactsContainer';
import ServiceContainer from './ServiceContainer';
import CatalogRoutes from './Catalog/CatalogRoutes';

class MainRoutes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  
  render() {    
    const { location }   = this.props;
    return (
      <main id="main" className={getClass({b: 'main'})}>
       

        <Switch location={location}>
          <Route exact path="/" component={MainPageContainer} />
          <Route path="/catalog" 
            component={
              CatalogRoutes
            } 
          />
          <Route path="/contacts" component={ContactsContainer} />
          <Route path="/service" component={ServiceContainer} />
        </Switch>


      </main>
    );
  }
}
// <TransitionGroup>
//          <CSSTransition key={location.key}  
//            classNames="fading"
//            appear={true}
//            enter={false}
//            exit={false}
//            timeout={1000}
//          >
/*<Route render={() => <div>
                  <h1>В интернете нет страниц с таким адресом.</h1>
                  <p>За исключением этой страницы, которая сообщает вам о статусе 404 NotFound!</p>
                </div>} />*/
const mapStateToProps = state => {
  const { catalog } = state;

  return {
    ...catalog
  };
};

export default withRouter(connect(mapStateToProps)(MainRoutes));
