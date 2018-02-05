import React  from 'react';
import getClass from './../constants/classes';
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
	...rest
}) => (
	<h3 className={`${getClass({b: block, el: element, m: elementModifier})} ${getClass({b: "table", m: modifier, add: className })}`}>
		<Link className={getClass({b: "table", el: "refer", m: modifier})} 
			to={`${url}${slug}/`}>
			{content}
		</Link>
	</h3>
);

export default Table;