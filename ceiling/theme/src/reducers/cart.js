import {
	OPEN_CART,
	CLOSE_CART,
	PUT_PRODUCT,
	DELETE_PRODUCT,
	CHANGE_PRODUCT_QUANTITY,
	SHOW_HELP_TEXT,
	HIDE_HELP_TEXT
} from './../constants/cart.js';

/*
 * State:
 */

export const initState = {
	isCartOpened: false,
	products: [{
     	name: "Редкий предмет",
      	uuid: "",
      	quantity: 1,
      	combustibility: "",
        acoustics: "",
        lightning: "",
        edges: "",
        material: "",
        colors: "",
        width: "",
        height: "",
        length: "",
        thickness: "",
    },
    {
      	name: "Великолепный предмет",
      	uuid: "",
      	quantity: 1,
      	combustibility: "",
        acoustics: "",
        lightning: "",
        edges: "",
        material: "",
        colors: "",
        width: "",
        height: "",
        length: "",
        thickness: "",
    },
    {
     	name: "Редкий предмет",
      	uuid: "",
      	quantity: 1,
      	combustibility: "",
        acoustics: "",
        lightning: "",
        edges: "",
        material: "",
        colors: "",
        width: "",
        height: "",
        length: "",
        thickness: "",
    },
    {
      	name: "Великолепный предмет",
      	uuid: "",
      	quantity: 1,
      	combustibility: "",
        acoustics: "",
        lightning: "",
        edges: "",
        material: "",
        colors: "",
        width: "",
        height: "",
        length: "",
        thickness: "",
    },
    {
     	name: "Редкий предмет",
      	uuid: "",
      	quantity: 1,
      	combustibility: "",
        acoustics: "",
        lightning: "",
        edges: "",
        material: "",
        colors: "",
        width: "",
        height: "",
        length: "",
        thickness: "",
    },
    {
      	name: "Великолепный предмет",
      	uuid: "",
      	quantity: 1,
      	combustibility: "",
        acoustics: "",
        lightning: "",
        edges: "",
        material: "",
        colors: "",
        width: "",
        height: "",
        length: "",
        thickness: ""
    }
    ],
	quantityOrderedProducts: 0,
	helpText: '',
	isShownHelpText: false

};

const cart = (
	state=initState,
	action
) => {
	let products, index;
	
	switch (action.type) {
		case OPEN_CART:
			return {
				...state,
				isCartOpened: true
			};
		case CLOSE_CART:
			return {
				...state,
				isCartOpened: false
			};
		case PUT_PRODUCT:
			return {
				...state,
				products: [
					...state.products,
					action.product
				],
				quantityOrderedProducts: state.quantityOrderedProducts + 1
			};
		case DELETE_PRODUCT:
			index = action.id;
			products = state.products;

			return {
				...state,
				products: [
					...products.slice(0, index),
					...products.slice(index + 1)
				],
				quantityOrderedProducts: state.quantityOrderedProducts - 1
			};
		case CHANGE_PRODUCT_QUANTITY:
			products = state.products;
			index = action.id;

			return {
				...state,
				products: [
					...products.slice(0, index),
					{
						...products[index],
						quantity: action.quantity
					},					
					...products.slice(index + 1)

				]
			};
		case SHOW_HELP_TEXT:
			return {
				...state,
				helpText: action.helpText,
				isShownHelpText: true
			};
		case HIDE_HELP_TEXT:
			return {
				...state,
				helpText: '',
				isShownHelpText: false	
			};
		default:
			return {
				...state,
				quantityOrderedProducts: state.products.length
			};
	}
}

export default cart;