import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import {reduxForm} from 'redux-form';
import Form from './Form';
import Cart from './Cart';
import phone_number from './../images/icons/phone.png';
import user from './../images/icons/user.png';
import envelope from './../images/icons/envelope.png';

import {
	required, 
	phone, 
	fullNameLength, 
	full_name,
	phoneLength,
	email
} from './../constants/validation';

const OrderForm = ({
	...rest,
	helpText,
	products,
	closeOrder
}) => (
	<Form fields={[
		{
			maxLength: 150,
			minLenght: 10,
			autoFocus: true,
			name: "full_name",
			type: "text",
			validate: [required, fullNameLength, full_name],
			placeholder: "Иванов Иван Иванович",
			label: "ФИО",
			iconOptions: {
				url: user,
				maxWidth: 35
			},
			className:"parent row h-around"
		},
		{
			type: "tel",
			maxLength: 26,
			minLenght: 11,
			name: "phone_number",
			validate: [required, phone, phoneLength],
			placeholder: "+7 (985) 905-02-51",
			label: "Телефон",
			iconOptions: {
				url: phone_number,
				maxWidth: 35
			},
			className:"parent row h-around"
		},
		{
			type: "email",
			maxLength: 150,
			minLenght: 1,
			name: "email",
			validate: [required, email],
			placeholder: "awesome_maria@mail.ru",
			label: "Email",
			iconOptions: {
				url: envelope,
				maxWidth: 35
			},
			className:"parent row h-around"
		}
	]}  
	serverError={helpText}
	{...rest}>
		<Cart {...rest}
			modifier="order"
          	cartProducts={products} />
	</Form>
);


export default reduxForm({
	form: "orderForm"
})(OrderForm);