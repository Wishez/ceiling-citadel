import {
  makeOrder,
  requestOrder,
  tryMakeOrder,
  closeOrder,
  openOrder
} from './../actions/order';

import {
  OPEN_ORDER,
  MAKE_ORDER,
  CLOSE_ORDER,
  REQUEST_ORDER
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

testOpenOrder();
testCloseOrder();
testFailureOrderNotification();
testSucessOrder();
testRequestOrder();
