import React from 'react';
import getClass, { composeClasses } from './../constants/classes';

const Button = ({
	block, 
	element='',
	modifier='',
	content,
	children,
	className,
	...rest
}) => (
	<button {...rest}
		aria-pressed={false}
		className={`${getClass(composeClasses(block, element, modifier, `button`))} ${className}`}>
		{content}
		{children}
	</button>
);


export default Button;