import React from 'react';
import getClass, { composeClasses } from './../constants/classes';

const Button = ({
	block, 
	element='',
	modifier='',
	href,
	content,
	children
}) => (
	<button href={href}
		className={getClass(composeClasses(block, element, modifier))}>
		{content}
		{children}
	</button>
);


export default Button;