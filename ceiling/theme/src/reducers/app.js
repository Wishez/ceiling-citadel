import {
	SET_USER_DATA
} from './../constants/actionTypes.js'

export const initState = {
	phone: '+7 (985) 905-12-51',
    email: 'shiningfinger@list.ru',
    userData: {
	    full_name: "",
		phone_number: "",
		email: ""
    }
};


const app = (
	state = initState,
	action
) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				userData: {
					...action.userData
				}
			};
		default:
			return state;
	}
};

export default app;