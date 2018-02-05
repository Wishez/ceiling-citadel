import React  from 'react';
import getClass from './../constants/classes';
import Table from './Table';
import Figure from './Figure';
import Description from './Description';

const CatalogItem = ({ 
	block,
	children,
	modifier,
	className,
	content,
	name,
	tablePosition='stretch',
	image,
	description,
	style,
	slug,
	...rest
}) => (
	<article style={{backgroundImage:`url("/media/${image}")`}} 
		className={getClass({b: "catalogItem", m: modifier, add: `${className}${style ? ` catalogItem_${style}`: ''}` })}>
		<Table slug={slug} content={name} modifier={tablePosition} />
		<Description content={description} />
	</article>
	
);

export default CatalogItem;