import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import Button from './Button';

const MenuButton = ({
	openMenu,
    isOpened,
    closeMenu,
    ...rest
}) => (
	<Button id='menuButton'
      className={getClass({
        b: "navigation",
        el: isOpened ? "closeMenuButton" : "openMenuButton"
      })}
      size='big'
      icon='bars'
      onClick={isOpened ? closeMenu : openMenu} 
    >
     

      <span className={getClass({
        b: "bar",
        m: "orange"
      })}></span>
      <span className={getClass({
        b: "bar",
        m: "cian"
      })}></span>
      <span className={`visible-hidden ${getClass({
        b: "bar",
        m: "cian"
      })}`}></span>
      <span className={getClass({
        b: "bar",
        m: "darkBlue"
      })}></span>

    </Button>
);


export default MenuButton;