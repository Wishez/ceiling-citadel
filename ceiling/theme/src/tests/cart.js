import {
	openCart, 
	closeCart, 
	putProduct, 
	deleteProduct,
	changeProductQuantity,
	showHelpText,
	hideHelpText
} from './../actions/cart';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import cart, {initState} from './../reducers/cart';

const testOpenCart = () => {
	const cartBefore = initState;
	const cartAfter = {
		...cartBefore,
		isCartOpened: true
	};

	deepFreeze(cartBefore);

	expect(
		cart(cartBefore, openCart())
	).toEqual(cartAfter);
};

const testCloseCart = () => {
	const cartBefore = {
		...initState,
		isCartOpened: true
	};
	const cartAfter = initState;


	deepFreeze(cartBefore);

	expect(
		cart(cartBefore, closeCart())
	).toEqual(cartAfter);
};

const getProductToTheCartTest = () => {
	const cartBefore = {
		...initState,
		quantityOrderedProducts: initState.products.length
	};

	const newProduct = {
     	name: "Some Name of the product",
      	uuid: "12345",
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
    };

	const cartAfter = {
		...initState,
		products: [
			...initState.products,
			newProduct
		],
		quantityOrderedProducts: cartBefore.quantityOrderedProducts + 1
	};

	deepFreeze(cartBefore);

	expect(
		cart(cartBefore, putProduct(newProduct))
	).toEqual(cartAfter);
};

const throwProductFormCartTest = () => {
	const cartBefore = {
		...initState,
		quantityOrderedProducts: initState.products.length
	};

	const products = cartBefore.products;
	const index = 2;

	const cartAfter = {
		...initState,
		products: [
			...products.slice(0, index),
			...products.slice(index + 1)
		],
		quantityOrderedProducts: cartBefore.quantityOrderedProducts - 1
	};

	deepFreeze(cartBefore);

	expect(
		cart(cartBefore, deleteProduct(index))
	).toEqual(cartAfter);
};

const changeProductQuantityTest = () => {
	const cartBefore = {
		...initState,
		quantityOrderedProducts: initState.products.length
	};

	const products = cartBefore.products;
	const index = 3;
	const quantity = 6;

	const cartAfter = {
		...cartBefore,
		products: [
			...products.slice(0, index),
			{
				...products[index],
				quantity: quantity
			},					
			...products.slice(index + 1)
		]
	};

	deepFreeze(cartBefore);

	expect(
		cart(cartBefore, changeProductQuantity(index, quantity))
	).toEqual(cartAfter);
};

const showHelpTextTest = () => {
	const cartBefore = initState;
	const helpText = 'You will see it!';
	const cartAfter = {
		...cartBefore,
		helpText: helpText,
		isShownHelpText: true
	};

	deepFreeze(cartBefore);

	expect(
		cart(cartBefore, showHelpText(helpText))
	).toEqual(cartAfter);
};

const hideHelpTextTest = () => {
	const cartBefore = initState;
	const helpText = 'You will see it!';
	const cartAfter = {
		...cartBefore,
		helpText: '',
		isShownHelpText: false
	};

	deepFreeze(cartBefore);

	expect(
		cart(cartBefore, hideHelpText())
	).toEqual(cartAfter);
};


hideHelpTextTest();
showHelpTextTest();
changeProductQuantityTest();
throwProductFormCartTest();
getProductToTheCartTest();
testOpenCart();
testCloseCart();