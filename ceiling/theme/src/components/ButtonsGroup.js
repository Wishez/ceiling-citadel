import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import Button from './Button';

const GroupButtons = ({
  block='buttonsGroup',
  modifier,
  className,
  children,
  ...rest
}) => (
  <div {...rest} className={getClass(composeClasses(block, '', modifier, className))}>
    {children}	
  </div>
);


export default GroupButtons;