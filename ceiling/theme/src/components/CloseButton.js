import React from 'react';
import getClass, { composeClasses } from './../constants/classes';

const CloseButton = ({
  block, 
  element='',
  modifier='',
  className,
  ...rest
}) => (
  <button {...rest}
    type="button"
    aria-pressed={false}
    className={getClass(composeClasses(block, element, modifier, `closeButton ${className}`))}>
    <span className={getClass({b: 'closeButton', el: 'bar', m: 'right'})}></span>
    <span className={getClass({b: 'closeButton', el: 'bar', m: 'left'})}></span>
  </button>
);


export default CloseButton;
