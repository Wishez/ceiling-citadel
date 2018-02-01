import {
	OPEN_CALLBACK,
	ORDER_CALLBACK,
	CLOSE_CALLBACK,
	REQUEST_CALLBACK
} from './../constants/callback.js';

/*
 * State:
 */

export const initState = {
	isCallbackOpened: false,
	helpText: '',
	isShownHelpText: false,
	idOrderedCallback: false,
	isRequesting: false

};

const callback = (
	state=initState,
	action
) => {
	switch (action.type) {
		case OPEN_CALLBACK:
			return {
				...state,
				isCallbackOpened: true
			};
		case CLOSE_CALLBACK:
			return {
				...state,
				isCallbackOpened: false
			};
		case REQUEST_CALLBACK:
			return {
				...state,
				isRequesting: true
			};
		case ORDER_CALLBACK:
			return {
				...state,
				isOrderedCalback: action.isOrderedCallback,
				helpText: action.helpText,
				isRequesting: false
			};
		default:
			return state;
	}
}

export default callback;