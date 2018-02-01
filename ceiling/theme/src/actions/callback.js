import {
	OPEN_CALLBACK,
	ORDER_CALLBACK,
	CLOSE_CALLBACK,
	REQUEST_CALLBACK
} from './../constants/callback';
// import customAjaxRequest from './../constants/ajax';
import {siteApi} from './../constants/conf'

import {setUserData} from './app';

export const openCallback = () => ({
	type: OPEN_CALLBACK
});

export const closeCallback = () => ({
	type: CLOSE_CALLBACK
});

export const orderCallback = (isOrderedCallback, helpText) => ({
	type: ORDER_CALLBACK,
	isOrderedCallback,
	helpText
});
export const requestCallback = () => ({
	type: REQUEST_CALLBACK
});

export const tryOrderCallback = userData => dispatch => {
	dispatch(requestCallback());

	const request = customAjaxRequest({
		type: 'POST',
		url: `${siteApi}/make_form/callback/`,
		data: userData,
		processData: true,
        cache: true
	});

	return fetch(request)
		.then(data => data.json())
		.then(response => {
			dipatch(orderCallback(!!response, response));
			setUserData(userData.full_name, userData.phone_number, '');
		})
		.catch(errmsg => {
			dipatch(orderCallback(false, errmsg));
		})

};

