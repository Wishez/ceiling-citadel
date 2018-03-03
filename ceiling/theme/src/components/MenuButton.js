import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import Button from './Button';

const MenuButton = ({
  openMenu,
  isOpened,
  closeMenu,
  className,
  modifier,
  ...rest
}) => (
  <button
    aria-pressed={false}
    className={getClass(
      composeClasses(
        'menuButton', 
        '', 
        modifier, 
        `parent column centered ${className}${!isOpened ? ' menuButton_open' : ' menuButton_close'}`
      )
    )}
    onClick={isOpened ? closeMenu : openMenu}
  >
    <span className={getClass({
      b: 'menuButton',
      el: 'bar',
      m: 'orange',
      add: `lowCascadingShadow baseChild ${isOpened ? 'menuButton__bar_ceil' : ''}`
    })}></span>
    <span className={getClass({
      b: 'menuButton',
      el: 'bar',
      m: 'cian',
      add: `lowCascadingShadow baseChild ${isOpened ? 'menuButton__bar_cross_right' : ''}`
    })}></span>
    <span className={getClass({
      b: 'menuButton',
      el: 'bar',
      m: 'cian',
      add: `lowCascadingShadow ${isOpened ? 'menuButton__bar_cross_left' : 'visible-hidden'}`
    })}></span>
    <span className={getClass({
      b: 'menuButton',
      el: 'bar',
      m: 'darkBlue',
      add: `lowCascadingShadow baseChild ${isOpened ? 'menuButton__bar_floor' : ''}`
    })}></span>
    <span className={getClass({
      b: 'menuButton',
      el: 'text',
      add: 'baseChild upper'
    })}>Меню</span>
  </button>
);


export default MenuButton;
