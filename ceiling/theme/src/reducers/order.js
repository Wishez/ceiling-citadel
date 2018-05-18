import {
  OPEN_ORDER,
  MAKE_ORDER,
  CLOSE_ORDER,
  REQUEST_ORDER
} from './../constants/order.js';

/*
 * State:
 */

export const initState = {
  isOrderOpened: false,
  helpText: '',
  isShownHelpText: false,
  isOrderedOrder: false,
  isRequesting: false

};

const order = (
  state=initState,
  action
) => {

  switch (action.type) {
    case OPEN_ORDER:
      return {
        ...state,
        isOrderOpened: true
      };
      
    case CLOSE_ORDER:
      return {
        ...state,
        isOrderOpened: false
      };
      
    case REQUEST_ORDER:
      return {
        ...state,
        isRequesting: true
      };

    case MAKE_ORDER:
      return {
        ...state,
        isOrderedOrder: action.isOrderedOrder,
        helpText: action.helpText,
        isRequesting: false
      };

    default:
      return state;
  }
};

export default order;
