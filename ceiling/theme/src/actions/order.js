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

  return requestForMakingOrder({
    data: userData,
    success: orderSuccessHandler({
      userData,
      dispatch
    }),
    failure: orderFailureHandler(dispatch)
  });
};

export function requestForMakingOrder({
  success,
  failure,
  data
}) {
  return customAjaxRequest({
    type: 'POST',
    url: orderUrl,
    cache: true,
    data,
    success,
    failure
  });
}

function orderSuccessHandler({
  userData,
  dispatch
}) {
  return (response) => {
    dispatch(
      notifyAboutSuccessOrdertingOrder({
        response,
        userData
      })
    );
  };

}

function orderFailureHandler(dispatch) {
  return (error) => {
    dispatch(
      notifyAboutFailureOrderingOrder(error.message)
    );
  };

}

function notifyAboutSuccessOrdertingOrder({
  response,
  userData
}) {
  const message = response.text;
  const userEmail = userData.email;
  const userPhone = userData.phone_number;
  const isOrdered = true;

  return (dispatch) => {
    dispatch(makeOrder(isOrdered, message));
    setUserData(userData.full_name, userPhone, userEmail);
  };
}


export function notifyAboutFailureOrderingOrder(message) {
  return (dispatch) => {
    const isOrdered = false;

    dispatch(makeOrder(isOrdered, message));
  };
}
