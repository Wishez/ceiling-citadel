import {
	openCart, 
	closeCart, 
	putProduct, 
	deleteProduct,
	changeProductQuantity,
	showHelpText,
	hideHelpText
} from './../actions/cart';
import {
	TEST_STORE,
	EMPTY_ORDERED_PRODUCT
} from './../constants/cart';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import cart, {initState} from './../reducers/cart';


const testOpenCart = () => {
	const cartBefore = initState;
	const name = 'header';
	const cartAfter = {
		...cartBefore,
		isCartOpened: name
	};

	deepFreeze(cartBefore);

	expect(
		cart(cartBefore, openCart(name))
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
	localData.set(TEST_STORE, EMPTY_ORDERED_PRODUCT);

	const products = localData.get(TEST_STORE);

	const cartBefore = {
		...initState,
		quantityOrderedProducts: products.length
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
		isProductAdded: true,
		helpText: "Вы успешно добавили продукт в корзинуʕʘ̅͜ʘ̅ʔ.",
		quantityOrderedProducts: cartBefore.quantityOrderedProducts + 1
	};
	const storeAfter = [
            ...products,
            newProduct
  	];

	deepFreeze(cartBefore);

	expect(
		cart(cartBefore, putProduct(newProduct, TEST_STORE))
	).toEqual(cartAfter);

	const updatedStore = localData.get(TEST_STORE);

	expect(
		updatedStore
	).toEqual(storeAfter);
};

const throwProductFormCartTest = () => {
	localData.set(TEST_STORE, EMPTY_ORDERED_PRODUCT);

	const products = localData.get(TEST_STORE);
	const cartBefore = {
		...initState,
		quantityOrderedProducts: products.length
	};

	const index = 2;

	const cartAfter = {
		...initState,
		quantityOrderedProducts: cartBefore.quantityOrderedProducts - 1
	};
	const storeAfter = [
        ...products.slice(0, index),
        ...products.slice(index + 1)
    ];

	deepFreeze(cartBefore);
	
	expect(
		cart(cartBefore, deleteProduct(index, TEST_STORE))
	).toEqual(cartAfter);

	const updatedStore = localData.get(TEST_STORE);

	expect(
		updatedStore
	).toEqual(storeAfter);
};
import {localData} from './../constants/pureFunctions';

const changeProductQuantityTest = () => {

	localData.set(TEST_STORE, EMPTY_ORDERED_PRODUCT);

	const products = localData.get(TEST_STORE);

	const cartBefore = {
		...initState,
		quantityOrderedProducts: products.length
	};
				

	const index = 3;
	const quantity = 6;
	
	const cartAfter = cartBefore;
	const storeAfter =[
	      ...products.slice(0, index),
	      {
	        ...products[index],
	        quantity
	      },          
	      ...products.slice(index + 1)
	  ];

	deepFreeze(cartBefore);

	expect(
		cart(
			cartBefore, 
			changeProductQuantity(index, quantity, TEST_STORE)
		)
	).toEqual(cartAfter);

	const updatedStore = localData.get(TEST_STORE);

	expect(
		updatedStore
	).toEqual(storeAfter);
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