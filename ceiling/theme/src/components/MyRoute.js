import React from 'react';
import {Route} from 'react-router-dom';

const MyRoute = ({ 
    component: Component, 
    componentProps,
    ...rest
}) => (
   <Route {...rest} render={props => (
	  	<Component {...props} {...componentProps}/>
  	)}/>
)
export default MyRoute;