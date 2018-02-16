import React from 'react';
import getClass, { composeClasses } from './../constants/classes';

const Button = ({
  block, 
  element='',
  modifier='',
  content,
  children,
  className,
  ...rest
}) => (
  <button 
    type="button"
    aria-pressed={false}
    className={`${getClass({b: block, el: element, m: modifier, add: `button ${className}`})} ${className}`}
    {...rest}
  >
    {content}
    {children}
  </button>
);


export default Button;
