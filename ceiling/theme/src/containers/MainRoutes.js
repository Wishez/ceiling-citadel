import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {Route, Switch} from "react-router-dom"; 
import getClass from "./../constants/classes";

import MainPageContainer from "./MainPageContainer";
import ContactsContainer from "./ContactsContainer";
import ServiceContainer from "./ServiceContainer";
import CatalogRoutes from "./Catalog/CatalogRoutes";

class MainRoutes extends PureComponent {
  
  render() { 
    return (
      <main id="main" className={getClass({b: "main"})}>
        <Switch>
          <Route exact path="/" component={MainPageContainer} />
          <Route path="/catalog" 
            component={
              CatalogRoutes
            } 
          />
          <Route path="/contacts" component={ContactsContainer} />
          <Route path="/service" component={ServiceContainer} />
          <Route render={() => <section className='container'>
            <h1>В интернете нет страниц с таким адресом.</h1>
            <p>За исключением этой страницы, которая сообщает вам о статусе 404 NotFound!</p>
          </section>} />
        </Switch>


      </main>
    );
  }
}

const mapStateToProps = state => {
  const { catalog } = state;

  return {
    ...catalog
  };
};

export default withRouter(connect(mapStateToProps)(MainRoutes));
