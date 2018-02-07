import React  from 'react';
import getClass from './../../constants/classes';
import {Link} from 'react-router-dom';

const Table = ({ 
	block,
	element,
	elementModifier,
	modifier,
	className,
	content,
	url,
	slug,
	onClick,
	...rest
}) => (
	<h3 className={`${getClass({b: block, el: element, m: elementModifier, add: "upper centeredText"})} ${getClass({b: "table", m: modifier, add: className })}`}>
		<Link className={getClass({b: "table", el: "refer", m: modifier})} 
			to={`${url}${slug}/`}
			onClick={onClick}
		>
			{content}
		</Link>
	</h3>
);

export default Table;