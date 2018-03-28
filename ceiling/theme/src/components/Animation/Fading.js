import React from 'react';
import {CSSTransition} from 'react-transition-group';

const Fading = ({ children, ...rest }) => (
  <CSSTransition
    timeout={1000}
    classNames="fading"
    {...rest}
  >
    {children}
  </CSSTransition>
);


export default Fading;
