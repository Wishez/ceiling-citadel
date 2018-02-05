import React  from 'react';
import getClass from './../constants/classes';

const Description = ({ 
	block,
	element,
	elementModifier,
	children,
	modifier,
	className,
	content,
	...rest
}) => (
	<p className={`${getClass({b: "description", m: modifier, add: className })} ${getClass({b: block, el: elemnt, m: elementModifier})}`}>
		{content}
	 	{children}
	</p>
);

export default Description;