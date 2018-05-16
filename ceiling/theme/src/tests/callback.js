import {
  openCallback, 
  closeCallback, 
  orderCallback,
  requestCallback
} from './../actions/callback';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import callback, {initState} from './../reducers/callback';

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
  const helpText = "It's a response from server about success ordered callback.";
  const callbackAfter = {
    ...callbackBefore,
    isRequesting: false,
    isOrderedCallback: true,
    helpText
  };


  deepFreeze(callbackBefore);

  expect(
    callback(callbackBefore, orderCallback(true, helpText))
  ).toEqual(callbackAfter);
};


const testShowingRequestForCallback = () => {
  const callbackBefore = {
    ...initState
  };

  const callbackAfter = {
    ...callbackBefore,
    isRequesting: true
  };


  deepFreeze(callbackBefore);

  expect(
    callback(callbackBefore, requestCallback())
  ).toEqual(callbackAfter);
};

testShowingRequestForCallback();
testSuccessOrderedCallback();
testOpenCallback();
testCloseCallback();

