import React, { Component } from 'react'; 
import { Route, Switch, Redirect } from 'react-router-dom'
import { RouteTransition } from 'react-router-transition';

import NotFound from './NotFound';
import MyRoute from './MyRoute';
import MainPageContainer from './../containers/MainPageContainer';
import RegistrationContainer from './../containers/RegistrationContainer';
import SharesContainer from './../containers/SharesContainer';
import SingleShareContainer from './../containers/SingleShareContainer';
import ContactsContainer from './../containers/ContactsContainer';
import MediaContainer from './../containers/MediaContainer';
import BusinessContainer from './../containers/BusinessContainer';

const Main = ({

}) => (
    <Route render={({ location }) => (
        <Switch key={location.key} 
                location={location}>
            <Route exact path='/' render={props => (
                   <MainPageContainer {...props} />
            )} />   
            <MyRoute path='/possibilities'
                component={BusinessContainer} />
            <MyRoute path='/registration'
                component={RegistrationContainer} />  
            <MyRoute path='/contacts'
                component={ContactsContainer} /> 
            <MyRoute path='/media'
                component={MediaContainer} /> 
            <MyRoute path='/shares/:shareId/'
                component={SingleShareContainer} />
            <MyRoute path='/shares'
                component={SharesContainer} />
            <Route render={() => (
                <Redirect to="/" />
            )}  />
            <MyRoute path='/not_found'
                component={NotFound} />
        </Switch>
    )} />
);

export default Main;
