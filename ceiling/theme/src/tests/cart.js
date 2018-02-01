import {openCart, closeCart} from './../actions/cart';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import cart, {initState} from './../reducers/cart';

const testOpenCart = () => {
	const todoBefore = initState;
	const todoAfter = {
		...initState,
		isCartOpened: true
	};

	deepFreeze(todoBefore);

	expect(
		cart(todoBefore, openCart())
	).toEqual(todoAfter);
};

const testCloseCart = () => {
	const todoBefore = {
		...initState,
		isCartOpened: true
	};
	const todoAfter = initState;


	deepFreeze(todoBefore);

	expect(
		cart(todoBefore, closeCart())
	).toEqual(todoAfter);
};

testOpenCart();
testCloseCart();