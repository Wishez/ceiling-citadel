import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import {reduxForm} from 'redux-form';
import Form from './Form';

const ChangeQuantityProductForm = ({
	...rest,
	handleSubmit
}) => (
	<Form handleSubmit={handleSubmit} {...rest} />
);


export default reduxForm({
	form: "changeQuantityProduct"
})(ChangeQuantityProductForm);