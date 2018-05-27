import {
  OPEN_CALLBACK,
  ORDER_CALLBACK,
  CLOSE_CALLBACK,
  REQUEST_CALLBACK,
  ASK_QUESTION,
  REINIT_CALLBACK_FORM
} from './../constants/callback.js';


export const initState = {
  isCallbackOpened: false,
  helpText: '',
  isShownHelpText: false,
  isOrderedCallback: false,
  isRequesting: false,
  isAskedQuestion: false
};

const callback = (
  state=initState,
  action
) => {

  switch (action.type) {
    case OPEN_CALLBACK:
      return {
        ...state,
        isCallbackOpened: true,
        helpText: ''
      };

    case CLOSE_CALLBACK:
      return {
        ...state,
        isCallbackOpened: false
      };

    case REQUEST_CALLBACK:
      return {
        ...state,
        isRequesting: true
      };

    case ORDER_CALLBACK:
      return {
        ...state,
        isOrderedCallback: action.isOrderedCallback,
        helpText: action.helpText,
        isRequesting: false
      };

    case ASK_QUESTION:
      return {
        ...state,
        isAskedQuestion: action.isAskedQuestion,
        helpText: action.helpText,
        isRequesting: false
      };

    case REINIT_CALLBACK_FORM:
      return initState;

    default:
      return state;
  }
};

export default callback;
