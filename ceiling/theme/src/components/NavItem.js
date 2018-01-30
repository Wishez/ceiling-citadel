import React from 'react';
import getClass from './../constants/classes';
import ReactHtmlParser from 'react-html-parser';

const NavItem = ({
	block, 
	href,
	name,
	children
}) => (  
  <a href={href}
    className={getClass({b: block, el: "refer", add: "baseChild"})}>
    {name}
    {ReactHtmlParser(children)}
  </a>
);

export default NavItem;