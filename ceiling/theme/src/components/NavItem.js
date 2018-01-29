import React from 'react';
import getClass from './../constants/classes';

const NavItem = ({
	block, 
	href,
	name
}) => (  
  <a href={href}
    className={getClass({b: block, el: "refer"})}>
    {name}
  </a>
);

export default NavItem;