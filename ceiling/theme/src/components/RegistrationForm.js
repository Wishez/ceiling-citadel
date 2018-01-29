import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Checkbox } from 'semantic-ui-react';
import RenderController from './RenderController';
import ReactHtmlParser from 'react-html-parser'

import { 
	required,
 	email,
 	houseNum,
 	houseNumLength,
 	cityRegionStreet,
 	cityLength,
 	regionLength,
 	streetLength,
 	firstMiddleLastNames,
 	nameLength,
 	lastNameLength,
 	middleNameLength,
 	passportLength,
 	passport,
 	birthday,
 	phoneLength,
 	phone
} from './../constants/validation.js';

// import Captcha from './Captcha';

const RegistrationForm = ({
	submitRegistrationForm,
	handleSubmit,
	allowRegister,
	knowRules,
	isRegistering,
	registerMessage,
	switchState,
	removedMiddleNameField,
	switchMask
}) => (
	<form id='registrationForm'
		onSubmit={handleSubmit(submitRegistrationForm.bind(this))}
		className='registrationForm'>
		<Field component={RenderController}
			name='first_name'
			type='text'
			block='registrationFormController'
			validate={[required, firstMiddleLastNames, nameLength]}
			placeholder='Хэнк'
			maxLength='24'
			minLength='3'
			label='Имя'
			pattern='^[A-ZА-ЯЁ][a-zа-яё]*$'
		 />
		 <Field component={RenderController}
		 	name='last_name'
		 	type='text'
		 	block='registrationFormController'
			validate={[required, firstMiddleLastNames, lastNameLength]}
			placeholder='Реардэн'
			maxLength='30'
			minLength='3'
			label='Фамилия'
			pattern='^[A-ZА-ЯЁ][a-zа-яё]*$'
		 />
	
		<div onClick={switchState('removedMiddleNameField')} className='registrationFormController registrationFormController_narrow registrationFormController_checkbox'>
			<Checkbox 
			 	className='registrationFormController__checkbox'
			    label={
			 	'Нет отчества'} />
		 </div>
		 <Field component={RenderController}
		 	name='middle_name'
		 	type='text'
		 	style={removedMiddleNameField ? {
				opacity: 0,
				maxHeight: 0
		 	} : {}}
		 	modifier='switched'
		 	block='registrationFormController'
			validate={!removedMiddleNameField ? [firstMiddleLastNames, middleNameLength] : []}
			placeholder='Иванов'
			maxLength='30'
			minLength='3'
			label='Отчество'
			pattern='^[A-ZА-ЯЁ][a-zа-яё]*$'
		 />
		 <Field component={RenderController}
		 	name='birthday'
		 	type='date'
		 	block='registrationFormController'
			validate={[required]}
			label='День рождения'
		 />
		 <div onClick={switchState('isMaskedFields', switchMask)}
		 	className='registrationFormController registrationFormController_narrow registrationFormController_checkbox'>
			<Checkbox 
			 	className='registrationFormController__checkbox'
			 	name='citizenship'
			    label={
			 	'Не гражданин РФ'
				} 
			/>
		 </div>
		 <Field component={RenderController}
		 	name='passport_data'
		 	type='text'
		 	block='registrationFormController'
			validate={[required, passportLength, passport]}
			placeholder='1234-654321'
			maxLength='15'
			minLength='7'
			id='passportField'
			label='Серия и номер паспорта'
			pattern='^[A-ZА-Я0-9\-]*$'
		 />
	
		<Field component={RenderController}
		 	name='phone_number'
		 	type='text'
		 	block='registrationFormController'
			validate={[required, phoneLength, phone]}
			placeholder='+7 (964) 555-65-75 '
			maxLength='24'
			minLength='11'
			pattern='^\+?[0-9\s\-)(]*$'
			id='phoneField'
			label='Номер телефона'
		 />
		<Field component={RenderController}
		 	name='city'
		 	type='text'
		 	block='registrationFormController'
			validate={[required, cityRegionStreet, cityLength]}
			placeholder='Москва, Лондон, Токио'
			maxLength='50'
			minLength='3'
			label='Город'
			pattern='^[a-zA-Zа-яА-Я\s\-]*$'
		 />
		<Field component={RenderController}
		 	name='region'
		 	type='text'
		 	block='registrationFormController'
			validate={[regionLength, cityRegionStreet]}
			placeholder='Московская, Тульская'
			maxLength='50'
			minLength='3'
			label='Область'
			pattern='^[a-zA-Zа-яА-Я\s\-]*$'
		 />
		<Field component={RenderController}
		 	name='street'
		 	type='text'
		 	block='registrationFormController'
			validate={[required, cityRegionStreet, streetLength]}
			placeholder='Тисовая, Бейкер-стрит, Пушкина '
			maxLength='50'
			minLength='3'
			label='Улица'
			pattern='^[a-zA-Zа-яА-Я\s\-]*$'
		 />
		<Field component={RenderController}
		 	name='num_home'
		 	type='text'
		 	block='registrationFormController'
			validate={[required, houseNumLength, houseNum]}
			placeholder='85A'
			maxLength='7'
			minLength='1'
			label='Номер дома'
			pattern='^[\w0-9]*$'
		 />
		<Field component={RenderController}
		 	name='num_apartment'
		 	type='number'
		 	block='registrationFormController'
			validate={[required]}
			placeholder='28'
			max='600'
			min='1'
			label='Номер квартиры'
		 />
		 <Field component={RenderController}
		 	name='email'
		 	type='email'
		 	block='registrationFormController'
			validate={[required, email]}
			placeholder='your_email@mail.ru'
			maxLength='100'
			minLength='5'
			label='E-mail'
		 />
		 
		 <div className='registrationFormController'>
		 	<div class='registrationFormController__rules'>
		 		<a href='https://ru-eshop.oriflame.com/iframe/custom/ru/consultant/Registration.pdf' class='not-follow'>Договор</a>
				<br />
		 		<a href='https://ru-eshop.oriflame.com/iframe/custom/ru/consultant/Registration.pdf' class='not-follow'>Условия</a>
		 	</div>
			<Checkbox onClick={allowRegister}
			 	className='registrationFormController__checkRules'
			    label={
			 	'Вы ознакомились с договором и условиями?'} />
		 </div>
		 <div className='registrationFormButtons'>
			{registerMessage ? <strong className='registrationFormButtons__formError formError'>{registerMessage}</strong> : ''}
			<br />
		 	<Button disabled={!knowRules}
		 		loading={isRegistering}
		 		className='registrationFormButtons__button registrationFormButtons__button_submit submit defaultButton' 
		 	   	content='Зарегистрироваться'
		 	/>
		 </div>
	</form>
);


export default reduxForm({
	form: 'registrationForm'
})(RegistrationForm);
