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
	<Button
      id='menuButton'
      className={getClass(
        composeClasses(
          "menuButton", 
          '', 
          modifier, 
          `parent column centered ${className} ${isOpened ? "menuButton_open" : "menuButton_close"}`
        )
      )}
      onClick={isOpened ? closeMenu : openMenu}
   >
      <span className={getClass({
        b: "menuButton",
        el: "bar",
        m: "orange",
        add: "baseChild"
      })}></span>
      <span className={getClass({
        b: "menuButton",
        el: "bar",
        m: "cian",
        add: "baseChild"
      })}></span>
      <span className={getClass({
        b: "menuButton",
        el: "bar",
        m: "cian",
        add: "visible-hidden"
      })}></span>
      <span className={getClass({
        b: "menuButton",
        el: "bar",
        m: "darkBlue",
        add: "baseChild"
      })}></span>
      <span className={getClass({
        b: "menuButton",
        el: "text",
        add: "baseChild upper"
      })}>Меню</span>
    </Button>
);


export default MenuButton;