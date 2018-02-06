import React from 'react';

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {CSSTransitionGroup} from 'react-transition-group';
import getClass from './../../constants/classes';


const Fading = ({
	children,
	className,
	component="div",
	...rest
}) => (
	<CSSTransitionGroup
		component={component}
		className={className}
	    transitionName={{
	      enter: getClass({b: 'fading', m: "enter"}),
	      enterActive: getClass({b: 'fading', m: "enterActive"}),
	      leave: getClass({b: 'fading', m: "leave"}),
	      leaveActive: getClass({b: 'fading', m: "leaveActive"})
	    }}
	    transitionEnterTimeout={500}
	    transitionLeaveTimeout={300}
	    {...rest}
	   >
      {children}
	</CSSTransitionGroup>
);

export default Fading;