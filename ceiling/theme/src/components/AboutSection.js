import React  from 'react';
import getClass from './../constants/classes';
import Figure from './Figure';
import Paragraph from './Paragraph';

const AboutSection = ({ 
	block,
	modifier,
	children,
	title,
	className,
	sources,
	text,
	image,
	maxWidth,
	...rest
}) => (
	<article className={getClass({
		b: "aboutSection", 
		m: modifier, 
		add: `${className} parent row centered` 
	})}>
		<h2 className={getClass({
			b: "aboutSection", 
			el: 'title', 
			m: modifier})}>
			{title}
		</h2>
		<Figure name={modifier}
			maxWidth={maxWidth}
			url={image} sources={sources}/>
		<Paragraph text={text} 
			block="aboutSection" 
			modifier={modifier}
		/>
	 	{children}
	</article>
);

export default AboutSection;