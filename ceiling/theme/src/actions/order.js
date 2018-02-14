import {
	OPEN_ORDER,
	MAKE_ORDER,
	CLOSE_ORDER,
	REQUEST_ORDER
} from './../constants/order';
import customAjaxRequest from './../constants/ajax';
import {orderUrl} from './../constants/conf'

import {setUserData} from './app';

export const openOrder = () => ({
	type: OPEN_ORDER
});

export const closeOrder = () => ({
	type: CLOSE_ORDER
});

export const makeOrder = (isOrderedOrder, helpText) => ({
	type: MAKE_ORDER,
	isOrderedOrder,
	helpText
});
export const requestOrder = () => ({
	type: REQUEST_ORDER
});

export const tryMakeOrder = userData => dispatch => {
	dispatch(requestOrder());

	return customAjaxRequest({
		type: 'POST',
		url: orderUrl,
		data: userData,
        cache: true,
        success: response => {
			const text = response.text;

			dispatch(makeOrder(true, text));
			setUserData(userData.full_name, userData.phone_number, '');
	    },
        failure: error => {
			dispatch(makeOrder(false, error.message));
        }
	});

};

