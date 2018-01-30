import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import Button from './Button';
import colors from './../constants/colors';
import Figure from './Figure';
import callbackIcon from './../images/icons/callback.png';

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