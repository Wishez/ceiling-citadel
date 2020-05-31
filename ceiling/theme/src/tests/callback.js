import {
  openCallback,
  closeCallback,
  orderCallback,
  requestCallback,
  reinitCallbackForm
} from "./../actions/callback";
import expect from "expect";
import deepFreeze from "deep-freeze";
import callback, {initState} from "./../reducers/callback";

const testOpenCallback = () => {
  const callbackBefore = initState;
  const callbackAfter = {
    ...callbackBefore,
    isCallbackOpened: true
  };

  deepFreeze(callbackBefore);

  expect(
    callback(callbackBefore, openCallback())
  ).toEqual(callbackAfter);
};

const testCloseCallback = () => {
  const callbackBefore = {
    ...initState,
    isCallbackOpened: true
  };
  const callbackAfter = initState;

  deepFreeze(callbackBefore);

  expect(
    callback(callbackBefore, closeCallback())
  ).toEqual(callbackAfter);
};

const testSuccessOrderedCallback = () => {
  const callbackBefore = {
    ...initState,
    isRequesting: true
  };

  const isOrdered = true;
  const helpText = "It's a response from server about success ordered callback.";
  const callbackAfter = {
    ...callbackBefore,
    isRequesting: false,
    isOrderedCallback: true,
    helpText
  };


  deepFreeze(callbackBefore);

  expect(
    callback(callbackBefore, orderCallback(isOrdered, helpText))
  ).toEqual(callbackAfter);
};


const testShowingRequestForCallback = () => {
  const callbackBefore = initState;

  const callbackAfter = {
    ...callbackBefore,
    isRequesting: true
  };

  deepFreeze(callbackBefore);

  expect(
    callback(callbackBefore, requestCallback())
  ).toEqual(callbackAfter);
};

const testReinitCallbackForm = () => {
  const stateBefore = {
    ...initState,
    isOrderedCallback: true,
    helpText: "The hint of this module has relation with two form. I need to clean it after closing and opening  callback from." ,
    isRequesting: false
  };

  const stateAfter = initState;


  deepFreeze(stateBefore);

  expect(
    callback(stateBefore, reinitCallbackForm())
  ).toEqual(stateAfter);
};

testReinitCallbackForm();

testShowingRequestForCallback();
testSuccessOrderedCallback();
testOpenCallback();
testCloseCallback();
