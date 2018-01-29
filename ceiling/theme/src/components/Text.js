import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const Text = ({
	text,
	className,
	children
}) => (
	<div className={`textContainer ${className ? className : ''}`}>
		{ReactHtmlParser(text)}
		{children}
	</div>
);

export default Text;