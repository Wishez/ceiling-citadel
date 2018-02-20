import React from 'react';
import {CSSTransition} from 'react-transition-group';

const Fading = ({ children, ...rest }) => (
  <CSSTransition
    {...rest}
    timeout={1000}
    classNames="fading"
  >
    {children}
  </CSSTransition>
);


export default Fading;
