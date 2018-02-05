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
	<p className={`${getClass({b: "catalogDescription", m: modifier, add: className })} ${getClass({b: block, el: element, m: elementModifier, add: 'parent row centered'})}`}>
		{content}
	 	{children}
	</p>
);

export default Description;