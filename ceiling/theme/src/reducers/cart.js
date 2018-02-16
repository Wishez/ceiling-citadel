import {
  OPEN_CART,
  CLOSE_CART,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  CHANGE_PRODUCT_QUANTITY,
  SHOW_HELP_TEXT,
  HIDE_HELP_TEXT,
  SHOW_ACTION,
  PRODUCTION_STORE
} from './../constants/cart';
import {localData} from './../constants/pureFunctions';

export const initState = {
  isCartOpened: false,
  quantityOrderedProducts: 0,
  helpText: '',
  isShownHelpText: false,
  isProductAdded: false,
  isRequesting: false
};

const cart = (
  state=initState,
  action
) => {
  let products, index, storeName;
	
  switch (action.type) {
	    case SHOW_ACTION:
      return {
        ...state,
        isRequesting: true
      };
	    case OPEN_CART:
      return {
        ...state,
        isCartOpened: action.id
      };
    case CLOSE_CART:
      return {
        ...state,
        isCartOpened: false
      };
    case PUT_PRODUCT:
      storeName = action.store;
      products = localData.get(storeName) || [];

      localData.set(storeName, [
			    ...products,
			    action.product
      ]);

      return {
        ...state,
        isProductAdded: true,
        isRequesting: false,
        helpText: 'Вы успешно добавили продукт в корзинуʕʘ̅͜ʘ̅ʔ.',
        quantityOrderedProducts: state.quantityOrderedProducts + 1
      };
    case DELETE_PRODUCT:
      storeName = action.store;
      index = action.id;
      products = localData.get(storeName) || [];

      localData.set(storeName, [
			  ...products.slice(0, index),
			  ...products.slice(index + 1)
      ]);

			
      return {
        ...state,
        quantityOrderedProducts: state.quantityOrderedProducts - 1
      };
    case CHANGE_PRODUCT_QUANTITY:
      storeName = action.store;
      products = localData.get(storeName);
      index = action.id;

      localData.set(storeName, [
			  ...products.slice(0, index),
			  {
			    ...products[index],
			    quantity: action.quantity
			  },          
			  ...products.slice(index + 1)
      ]);

      return state;
    case SHOW_HELP_TEXT:
      return {
        ...state,
        helpText: action.helpText,
        isShownHelpText: true
      };
    case HIDE_HELP_TEXT:
      return {
        ...state,
        helpText: '',
        isShownHelpText: false	
      };
    default:
      		products = localData.get(PRODUCTION_STORE) || [];
      return {
        ...state,
        quantityOrderedProducts: products.length
      };
  }
};

export default cart;
