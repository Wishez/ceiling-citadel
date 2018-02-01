import {
	SET_USER_DATA
} from './../constants/actionTypes.js'

export const setUserData = (full_name, phone_number, email) =>  ({
	type: SET_USER_DATA,
	userData: {
		full_name,
		phone_number,
		email
	}
});