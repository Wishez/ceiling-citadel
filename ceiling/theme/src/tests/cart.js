import {
  openCart,
  closeCart,
  putProduct,
  deleteProduct,
  changeProductQuantity,
  showHelpText,
  hideHelpText,
  showProductInfo,
  hideProductInfo
} from '@/actions/cart';
import { TEST_STORE, EMPTY_ORDERED_PRODUCT } from '@/constants/cart';
import { timeout } from '@/constants/pureFunctions';

import expect from 'expect';
import deepFreeze from 'deep-freeze';
import cart, { initState } from '@/reducers/cart';

const isNotTest = false;

const testOpenCart = () => {
  const cartBefore = initState;
  const name = 'header';
  const cartAfter = {
    ...cartBefore,
    isCartOpened: name
  };

  deepFreeze(cartBefore);

  expect(cart(cartBefore, openCart(name), isNotTest)).toEqual(cartAfter);
};

const testCloseCart = () => {
  const cartBefore = {
    ...initState,
    isCartOpened: true
  };
  const cartAfter = initState;

  deepFreeze(cartBefore);

  expect(cart(cartBefore, closeCart(), isNotTest)).toEqual(cartAfter);
};


const getProductToTheCartTest = () => {
  const STORE_NAME = 'getProductToTheCartTestStore';

  setTestProducts(STORE_NAME).then((products) => {
    const cartBefore = {
      ...initState,
      quantityOrderedProducts: products.length
    };

    const newProduct = {
      name: 'Some Name of the product',
      uuid: '12345',
      quantity: 1,
      combustibility: '',
      acoustics: '',
      lightning: '',
      edges: '',
      material: '',
      colors: '',
      width: '',
      height: '',
      length: '',
      thickness: ''
    };

    const cartAfter = {
      ...initState,
      isProductAdded: true,
      helpText: 'Вы успешно добавили продукт в корзинуʕʘ̅͜ʘ̅ʔ.',
      quantityOrderedProducts: cartBefore.quantityOrderedProducts + 1
    };

    deepFreeze(cartBefore);

    expect(
      cart(
        cartBefore,
        putProduct(newProduct, STORE_NAME),
        isNotTest
      )
    ).toEqual(cartAfter);

    const expectedProducts = [...products, newProduct];

    checkDifferanceBetweetProductsInStore({
      storeName: STORE_NAME,
      expectedProducts
    });
  });

};

function setTestProducts(storeName=TEST_STORE) {
  return localforage.setItem(storeName, EMPTY_ORDERED_PRODUCT);
}

function getTestProducts(storeName=TEST_STORE) {
  return localforage.getItem(storeName);
}

const throwProductFromCartTest = () => {
  const STORE_NAME = 'throwProductFromCartTestStore';

  setTestProducts(STORE_NAME).then((products) => {
    const cartBefore = {
      ...initState,
      quantityOrderedProducts: products.length
    };

    const productIndex = 2;

    const cartAfter = {
      ...initState,
      quantityOrderedProducts: cartBefore.quantityOrderedProducts - 1
    };

    deepFreeze(cartBefore);

    expect(
      cart(
        cartBefore, deleteProduct(productIndex, STORE_NAME), isNotTest
      )
    ).toEqual(cartAfter);

    const expectedProducts = [
      ...products.slice(0, productIndex),
      ...products.slice(productIndex + 1)
    ];

    checkDifferanceBetweetProductsInStore({
      storeName: STORE_NAME,
      expectedProducts
    });
  });
};

function checkDifferanceBetweetProductsInStore({
  expectedProducts,
  storeName=TEST_STORE
}) {
  timeout(() => {
    getTestProducts(storeName).then((updatedProducts) => {
      expect(updatedProducts).toEqual(expectedProducts);
    });
  }, 500);
}

const changeProductQuantityTest = () => {
  const STORE_NAME = 'changeProductQuantityTestStore';

  setTestProducts(STORE_NAME).then((products) => {
    const cartBefore = {
      ...initState
    };
    const cartAfter = cartBefore;

    deepFreeze(cartBefore);

    const productIndex = 3;
    const quantity = 6;


    expect(
      cart(cartBefore, changeProductQuantity(productIndex, quantity, STORE_NAME), isNotTest)
    ).toEqual(cartAfter);

    const expectedProducts = [
      ...products.slice(0, productIndex),
      {
        ...products[productIndex],
        quantity
      },
      ...products.slice(productIndex + 1)
    ];

    checkDifferanceBetweetProductsInStore({
      storeName: STORE_NAME,
      expectedProducts
    });
  });
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

  expect(cart(cartBefore, showHelpText(helpText), isNotTest)).toEqual(cartAfter);
};

const hideHelpTextTest = () => {
  const cartBefore = initState;
  const cartAfter = {
    ...cartBefore,
    helpText: '',
    isShownHelpText: false
  };

  deepFreeze(cartBefore);

  expect(cart(cartBefore, hideHelpText(), isNotTest)).toEqual(cartAfter);
};

const testProductModalInfo = {
  width: 16,
  height: 25.888,
  length: 41.886784,
  quantity: 67.772816512,
  name: 'Magic Golden Ratio'
};

const testShowProductInfo = () => {
  const stateBefore = initState;
  const payload = {
    ...testProductModalInfo
  };

  const stateAfter = {
    ...initState,
    productModalInfo: {
      ...payload
    },
    isProductInfoOpened: true
  };

  deepFreeze(stateBefore);

  expect(
    cart(stateBefore, showProductInfo(payload))
  ).toEqual(stateAfter);
};

const testHideProductInfo = () => {
  const stateBefore = {
    ...initState,
    productModalInfo: {
      ...testProductModalInfo
    },
    isProductInfoOpened: true
  };

  const stateAfter = {
    ...initState,
    
  };

  deepFreeze(stateBefore);

  expect(
    cart(stateBefore, hideProductInfo())
  ).toEqual(stateAfter);
};

testHideProductInfo();

testShowProductInfo();
hideHelpTextTest();
showHelpTextTest();
changeProductQuantityTest();
throwProductFromCartTest();
getProductToTheCartTest();
testOpenCart();
testCloseCart();
