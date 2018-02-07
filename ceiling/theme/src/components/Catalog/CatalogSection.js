import React  from 'react';
import getClass from './../../constants/classes';

const CatalogSection = ({ 
	block,
	modifier,
	children,
	name,
	titleShown=true,
	className,
	headerId,
	...rest
}) => (
	<section className={getClass({b: "catalogSection", m: modifier, add: `${className} parent row centered` })}>
		<h2 id={headerId} className={getClass({b: "catalogSection", el: 'title', m: modifier, add: titleShown ? "" : "visible-hidden" })}>
			{name}
		</h2>
	 	{children}
	</section>
);

export default CatalogSection;