import React  from 'react';
import getClass from './../constants/classes';

const CatalogSection = ({ 
	block,
	modifier,
	children,
	name,
	titleShown=true,
	className,
	...rest
}) => (
	<article className={getClass({b: "catalogSection", m: modifier, add: `${className} parent row centered` })}>
		<h2 className={getClass({b: "catalogSection", el: 'title', m: modifier, add: titleShown ? "" : "visible-hidden" })}>
			{name}
		</h2>
	 	{children}
	</article>
);

export default CatalogSection;