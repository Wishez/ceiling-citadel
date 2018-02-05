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
	url,
	...rest
}) => (
	<article style={{backgroundImage:`url("${image}")`}} 
		className={getClass({b: "catalogItem", m: modifier, add: `${className}${style ? ` catalogItem_${style}`: ''} parent row h-start v-end` })}>
		<Table  url={url} 
			slug={slug} 
			content={name} 
			modifier={tablePosition} 
		/>
		<Description content={description} />
	</article>
	
);

export default CatalogItem;