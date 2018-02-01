import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import Button from './Button';
import { Field } from 'redux-form';

const Form = ({
	block, 
	modifier='',
	content,
	children,
	handleSubmit,
	onSubmit,
	buttonOptions,
	button,
	className,
	fields,
	showButton=true,
	...rest
}) => (
	<form {...rest} className={getClass(composeClasses(block, '', modifier, className))}
		onSubmit={handleSubmit(onSubmit.bind(this))}
	>
		{fields.map((field, index) => (

			<Field  key={index} {...field}/>

		))}
		{children}
		{button ? 
			button :
			showButton ? 
				<Button type="submit" modifier="darkBlue"{...buttonOptions} /> : 
				''
		}
	</form>
);


export default Form;