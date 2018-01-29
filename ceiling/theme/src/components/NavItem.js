import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames'
	    
const NavItem = ({
	block, 
	href,
	name
}) => (  
  <Link to={href}
    className={`${block}__refer`}>
    {name}
  </Link>
);

export default NavItem;