import {
	OPEN_CALLBACK,
	ORDER_CALLBACK,
	CLOSE_CALLBACK,
	REQUEST_CALLBACK,
	ASK_QUESTION
} from './../constants/callback';
import customAjaxRequest from './../constants/ajax';
import {callbackUrl, questionUrl} from './../constants/conf'

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
export const askQuestion = (isAskedQuestion, helpText) => ({
	type: ASK_QUESTION,
	isAskedQuestion,
	helpText
});

export const requestCallback = () => ({
	type: REQUEST_CALLBACK
});

export const tryAskQuestion = userData => dispatch => {
	dispatch(requestCallback());


	return customAjaxRequest({
		type: 'POST',
		url: questionUrl,
		data: userData,
        cache: true,
        success: response => {
			const text = response.text;
			console.log(response, text)

			dispatch(askQuestion(true, text));
	    },
        failure: error => {
        	console.log('error')
			dispatch(askQuestion(false, error.message));
        }
	});
};

export const tryOrderCallback = userData => dispatch => {
	dispatch(requestCallback());

	return customAjaxRequest({
		type: 'POST',
		url: callbackUrl,
		data: userData,
        cache: true,
        success: response => {
			const text = response.text;

			dispatch(orderCallback(true, text));
			// setUserData(userData.full_name, userData.phone_number, '');
	    },
        failure: error => {
			dispatch(orderCallback(false, error.message));
        }
	});
};

