import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import {reduxForm} from 'redux-form';
import Form from './Form';
import envelope from './../images/icons/envelope.png';
import user from './../images/icons/user.png';
import message from './../images/icons/message.png';

import {
	required, 
	fullNameLength, 
	full_name,
	email
} from './../constants/validation';

const QuestionForm = ({
	...rest,
	helpText
}) => (
	<Form fields={[
		{
			maxLength: 150,
			minLength: 10,
			name: "full_name",
			type: "text",
			validate: [required, fullNameLength, full_name],
			placeholder: "Иванова Мария Ивановна",
			label: "ФИО",
			modifier: "whiteBg",
			iconOptions: {
				url: user,
				maxWidth: 35
			},
			className:"parent row h-around"
		},
		{
			type: "email",
			maxLength: 150,
			minLength: 3,
			name: "phone_number",
			validate: [required, email],
			placeholder: "ask_maria@yandex.ru",
			label: "Email",
			modifier: "whiteBg",
			iconOptions: {
				url: envelope,
				maxWidth: 35
			},
			className:"parent row h-around"
		},
		{
			type: "textarea",
			maxLength: 650,
			minLength: 30,
			name: "message",
			validate: [required],
			placeholder: "Насколько долго длиться жизненный цикл кашелота появившегося в небе?",
			label: "Вопрос",
			modifier: 'textarea',
			iconOptions: {
				url: message,
				maxWidth: 45
			},
			className:"parent row h-around"
		}
	]}  
	serverError={helpText}
	{...rest}>
	</Form>
);


export default reduxForm({
	form: "questionForm"
})(QuestionForm);