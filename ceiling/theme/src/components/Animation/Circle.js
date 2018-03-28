import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Circle = ({ children, ...props }) => (
  
  <CSSTransition
    {...props}
    timeout={800}
    classNames="unwrap"
  >
    {children}
  </CSSTransition>
);

export default Circle;
