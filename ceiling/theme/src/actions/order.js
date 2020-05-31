import {
  OPEN_ORDER,
  MAKE_ORDER,
  CLOSE_ORDER,
  REQUEST_ORDER,
} from "./../constants/order";
import customAjaxRequest from "./../constants/ajax";
import { orderUrl } from "./../constants/conf";

import { setUserData } from "./app";

export const openOrder = () => ({
  type: OPEN_ORDER,
});

export const closeOrder = () => ({
  type: CLOSE_ORDER,
});

export const makeOrder = (isOrderedOrder, helpText) => ({
  type: MAKE_ORDER,
  isOrderedOrder,
  helpText,
});
export const requestOrder = () => ({
  type: REQUEST_ORDER,
});

const notifyAboutSuccessOrdertingOrder = ({ response, userData }) => {
  const message = response.text;
  const userEmail = userData.email;
  const userPhone = userData.phone_number;
  const isOrdered = true;

  return (dispatch) => {
    dispatch(makeOrder(isOrdered, message));
    setUserData(userData.full_name, userPhone, userEmail);
  };
};

const orderSuccessHandler = ({ userData, dispatch }) => (response) =>
  dispatch(notifyAboutSuccessOrdertingOrder({
    response,
    userData,
  }));

export const notifyAboutFailureOrderingOrder = (message) => (dispatch) => {
  const isOrdered = false;
  dispatch(makeOrder(isOrdered, message));
};

const orderFailureHandler = (dispatch) => (error) =>
  dispatch(notifyAboutFailureOrderingOrder(error.message));

export const requestForMakingOrder = ({ success, failure, data }) =>
  customAjaxRequest({
    type: "POST",
    url: orderUrl,
    cache: true,
    data,
    success,
    failure,
  });

export const tryMakeOrder = (userData) => (dispatch) => {
  dispatch(requestOrder());

  return requestForMakingOrder({
    data: userData,
    success: orderSuccessHandler({
      userData,
      dispatch,
    }),
    failure: orderFailureHandler(dispatch),
  });
};
