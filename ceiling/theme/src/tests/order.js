import {
  makeOrder,
  requestOrder,
  requestForMakingOrder,
  closeOrder,
  openOrder
} from './../actions/order';

import {
  TEST_USER_ORDERED_PRODUCTS
} from './../constants/order';


import expect from 'expect';
import deepFreeze from 'deep-freeze';
import order, {initState} from './../reducers/order';


const testRequestOrder = () => {
  const stateBefore = initState;
  const stateAfter = {
    ...initState,
    isRequesting: true
  };
  deepFreeze(stateBefore);

  expect(
    order(stateBefore, requestOrder())
  ).toEqual(stateAfter);
};

const testSucessOrder = () => {
  const stateBefore = initState;
  const isOrderedOrder = true;
  const helpText = `Тесты ー это очень важная часть разработки,
    как животноводство для сельскохозяйственной промышленности.`;

  const stateAfter = {
    ...stateBefore,
    isOrderedOrder,
    helpText
  };

  deepFreeze(stateBefore);

  expect(
    order(stateBefore, makeOrder(isOrderedOrder, helpText))
  ).toEqual(stateAfter);
};

const testFailureOrderNotification = () => {
  const stateBefore = initState;
  const isOrderedOrder = false;
  const helpText = `Тесты ー это очень важная часть разработки,
    как использовать тире взамен дифиса в типографии.`;

  const stateAfter = {
    ...stateBefore,
    isOrderedOrder,
    helpText
  };

  deepFreeze(stateBefore);

  expect(
    order(stateBefore, makeOrder(isOrderedOrder, helpText))
  ).toEqual(stateAfter);
};

const testOpenOrder = () => {
  const stateBefore = initState;
  const stateAfter = {
    ...initState,
    isOrderOpened: true
  };


  deepFreeze(stateBefore);

  expect(
    order(stateBefore, openOrder())
  ).toEqual(stateAfter);
};

const testCloseOrder = () => {
  const stateBefore = {
    ...initState,
    isOrderOpened: true
  };
  const stateAfter = initState;


  deepFreeze(stateBefore);

  expect(
    order(stateBefore, closeOrder())
  ).toEqual(stateAfter);
};


const testMakeOrderWithOneProduct = () => {
  testMakeUserOrder(TEST_USER_ORDERED_PRODUCTS.length = 1);
};

function testMakeUserOrder({
  full_name='Futer Customer',
  email='awseome@mail.com',
  phone_number='+7 (985) 905-12-51',
  products
}) {
  const userData = {
    full_name,
    email,
    phone_number,
    isTest: true,
    products
  };

  requestForMakingOrder({
    data: userData,
    success: orderSuccessHandler,
    failure: orderFailureHandler
  });

  function orderSuccessHandler(response) {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.text).toBe('string');
  }

  function orderFailureHandler(error) {
    console.log(error);
  }
}

const testMakeOrderWithTwoProducts = () => {
  testMakeUserOrder(TEST_USER_ORDERED_PRODUCTS.length = 2);
};

const testMakeOrderWithThreeProducts = () => {
  testMakeUserOrder(TEST_USER_ORDERED_PRODUCTS.length = 3);
};

const testMakeOrderWithFourthProducts = () => {
  testMakeUserOrder(TEST_USER_ORDERED_PRODUCTS);
};

testMakeOrderWithFourthProducts();
testMakeOrderWithThreeProducts();
testMakeOrderWithTwoProducts();
testMakeOrderWithOneProduct();
testOpenOrder();
testCloseOrder();
testFailureOrderNotification();
testSucessOrder();
testRequestOrder();
