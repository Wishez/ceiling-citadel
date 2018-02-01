import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import CloseButton from './CloseButton';

const PopupFormContainer = ({
	block, 
	modifier='',
	children,
	className,
	children,
	closeButton,
	signification,
	...rest
}) => (
	<div className={getClass({b: "popupBackground"})}>
		<section {...rest} className={getClass(composeClasses(block, '', modifier, `popupFormContainer ${className}`))}>
			<h1 className={getClass({b: "block", el: "title", add: "popupFormContainer__title"})}>{signification}</h1>
			<CloseButton {...closeButton} />
			{children}
		</section>
	</div>
);


export default PopupFormContainer;