import React from 'react';
import getClass from './../../constants/classes';
import { Link } from 'react-router-dom';

const Breadcrumb = ({
	isActive,
	url,
	children,
	className,
	modifier,
	content,
	...rest
}) => (
	<Link {...rest} 
		to={url}
		className={getClass({b: "breadcrumb", m: modifier, add: className})}
	>		
		{content}
		{children}
	</Link>

);

export default Breadcrumb;