import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import Button from './Button';

const CloseButton = ({
  block,
  element='',
  modifier='',
  className,
  label='',
  ...rest
}) => (
  <Button {...rest}
    label={label}
    className={`${className ? className : ''} closeButton`}
    block={block}
    element={element}
    modifier={modifier}
    unstyled
  >
    <span className='closeButton__bar closeButton__bar_right'></span>
    <span className='closeButton__bar closeButton__bar_left'></span>
  </Button>
);


export default CloseButton;
