import {
  OPEN_CART,
  CLOSE_CART,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  CHANGE_PRODUCT_QUANTITY,
  HIDE_HELP_TEXT,
  SHOW_HELP_TEXT,
  SHOW_ACTION,
  PRODUCTION_STORE,
  RESET_ADD_TO_CART_FORM,
  SHOW_PRODUCT_INFO,
  HIDE_PRODUCT_INFO,
  UPDATE_PRODUCT_INFO
} from './../constants/cart';

export const changeProductQuantityAndUpdateInfo = ({
  id,
  productInfo,
  quantity
}) => (dispatch) => {
  dispatch(updateProductInfo(productInfo));
  dispatch(changeProductQuantity(id, quantity));
};

export const updateProductInfo = (productInfo) => ({
  type: UPDATE_PRODUCT_INFO,
  productInfo
});

export const showProductInfo = ({
  name,
  quantity,
  length,
  thickness,
  width,
  ...rest
}) => ({
  type: SHOW_PRODUCT_INFO,
  productModalInfo: {
    name,
    quantity,
    length,
    thickness,
    width,
    ...rest
  }
});

export const hideProductInfo = () => ({
  type: HIDE_PRODUCT_INFO
});

export const putProduct = (product, store=PRODUCTION_STORE) => ({
  type: PUT_PRODUCT,
  store,
  product
});

export const deleteProduct = (id, store=PRODUCTION_STORE) => ({
  type: DELETE_PRODUCT,
  store,
  id,
});

export const showAction = () => ({
  type: SHOW_ACTION
});

export const showAddingProductToCart = product => dispatch => {
  dispatch(showAction());
  dispatch(putProduct(product));
};

export const showHelpText = helpText => ({
  type: SHOW_HELP_TEXT,
  helpText
});
export const hideHelpText = () => ({
  type: HIDE_HELP_TEXT
});

let lastTimeOut = () => {};

export const deleteProductAndNotifyAbout = (index, message, quantity) => dispatch => {

  clearTimeout(lastTimeOut);

  dispatch(deleteProduct(index));
  dispatch(showHelpText(message));
  lastTimeOut = setTimeout(() => {
    dispatch(hideHelpText());

  }, 1300);

};

export const closeCart = () => ({
  type: CLOSE_CART
});

export const openCart = id => ({
  type: OPEN_CART,
  id
});
export const resetAddToCartForm = () => ({
  type: RESET_ADD_TO_CART_FORM
});

export const changeProductQuantity = (id, quantity, store=PRODUCTION_STORE) => ({
  type: CHANGE_PRODUCT_QUANTITY,
  store,
  quantity,
  id
});
