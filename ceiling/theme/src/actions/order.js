import {
  OPEN_ORDER,
  MAKE_ORDER,
  CLOSE_ORDER,
  REQUEST_ORDER
} from './../constants/order';
import customAjaxRequest from './../constants/ajax';
import {orderUrl} from './../constants/conf';

import {setUserData} from './app';

export const openOrder = () => ({
  type: OPEN_ORDER
});

export const closeOrder = () => ({
  type: CLOSE_ORDER
});

export const makeOrder = (isOrderedOrder, helpText) => ({
  type: MAKE_ORDER,
  isOrderedOrder,
  helpText
});
export const requestOrder = () => ({
  type: REQUEST_ORDER
});


export const tryMakeOrder = userData => dispatch => {
  dispatch(requestOrder());

  return customAjaxRequest({
    type: 'POST',
    url: orderUrl,
    data: userData,
    cache: true,
    success: response => {
      notifyAboutSuccessOrdertingOrder({
        response,
        userData,
        dispatch
      });
	  },
    failure: error => {
      notifyAboutFailureOrderingOrder({
        message: error.message,
        dispatch
      });
    }
  });
};


function notifyAboutSuccessOrdertingOrder({
  response,
  dispatch,
  userData
}) {
  const message = response.text;
  const userEmail = userData.email;
  const userPhone = userData.phone_number;
  const isOrdered = true;

  dispatch(makeOrder(isOrdered, message));
  setUserData(userData.full_name, userPhone, userEmail);
}


function notifyAboutFailureOrderingOrder({
  message,
  dispatch
}) {
  const isOrdered = false;

  dispatch(makeOrder(isOrdered, message));
}
