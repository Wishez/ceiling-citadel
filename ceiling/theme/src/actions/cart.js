import {
	OPEN_CART,
	CLOSE_CART,
	PUT_PRODUCT,
	DELETE_PRODUCT,
	CHANGE_PRODUCT_QUANTITY,
	HIDE_HELP_TEXT,
	SHOW_HELP_TEXT
} from './../constants/cart.js';


export const putProduct = product => ({
	type: PUT_PRODUCT,
	product
});

const deleteProduct = id => ({
	type: DELETE_PRODUCT,
	id
});


const showHelpText = helpText => ({
	type: SHOW_HELP_TEXT,
	helpText
});
const hideHelpText = () => ({
	type: HIDE_HELP_TEXT
});

let lastTimeOut = () => {};

export const deleteProductAndNotifyAbout = (index, message, quantity) => dispatch => {

	clearTimeout(lastTimeOut);

	dispatch(deleteProduct(index));
	dispatch(showHelpText(message));
		lastTimeOut = setTimeout(() => {
			// if (quantity !== 0) {
				dispatch(hideHelpText())
			// } else {
				
			// }
		}, 1300);
	
};

export const closeCart = () => ({
	type: CLOSE_CART
});

export const openCart = () => ({
	type: OPEN_CART
});

export const changeProductQuantity = (id, quantity) => ({
	type: CHANGE_PRODUCT_QUANTITY,
	quantity,
	id
});