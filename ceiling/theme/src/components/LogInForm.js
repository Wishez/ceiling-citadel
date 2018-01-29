import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import RenderController from './RenderController';
import { required } from './../constants/validation.js';


/*
Elements for LogInForm container
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import { tryLogin, logOut } from './../actions/accountActions.js'
import { cookiesHandler } from './../constants/pureFunctions.js';

submitLogInForm = (values, dispatch) => {
	dispatch(tryLogin('main', values));
}
* 
logOut = () => {
	const { dispatch } = this.props;
	// "main" is name of the site. 
	dispatch(logOut('main'));
	
}
* Props
static PropTypes = {    
    isLogged: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    userData: PropTypes.object.isRequred,
    isLogining: PropTypes.bool.isRequired
}
* For an user who has been logged.
loginInIfMay = () => {
	const { dispatch, isLogged } = this.props;
	// Функция, возвращающая кэшированные данные пользователя.
	const data = cookiesHandler.getUsernameAndPasswordFromCookies(site);

	// Проверка на уже залогинивщегося в свой аккаунт пользователя
	// и логинился ли он хоть раз на сайте.
	if (!isLogged && 
		(data.username && data.password)) {
		dispatch(tryLogin('main', data));	
	}
	}
 */

const LogInForm = ({
	submitLogInForm,
	handleSubmit,
	message,
	isLogining
}) => (
	<form id='logInForm'
		onSubmit={handleSubmit(submitLogInForm.bind(this))}
		className='logInForm'>
			<Field component={RenderController}
				name='username'
				type='text'
				block='logInFormController'
				validate={[required]}
				placeholder='Логин/Login'
				maxLength='75'
			 />
			 <Field component={RenderController}
			 	name='password'
			 	type='password'
			 	block='logInFormController'
				validate={[required]}
				placeholder='Пароль/Password'
				maxLength='75'
			 />
		 	{message ? <strong className='logInFormController__error'>{message}</strong> : ''}
			 <div className='logInFormButtons'>
			 	<Button className='logInFormButtons__button logInFormButtons__button--submit submit' 
			 	   	content='Войти'
			 	   	loading={isLogining}
			 	/>
			 	<Link to={`/registration`}
			 		className='logInFormButtons__button logInFormButtons__button--register'>
			 		Регистрация
			 	</Link>
			 </div>
		 	<Link to={`/remember_password`}
		 		className='logInFormButtons__forgotPass'>
		 		Забыли пароль?
		 	</Link>
		</form>
);


export default reduxForm({
	form: 'logInForm'
})(LogInForm);
 
