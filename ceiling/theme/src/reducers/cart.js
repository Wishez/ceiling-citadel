import {
  OPEN_CART,
  CLOSE_CART,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  CHANGE_PRODUCT_QUANTITY,
  SHOW_HELP_TEXT,
  HIDE_HELP_TEXT,
  SHOW_ACTION,
  RESET_ADD_TO_CART_FORM,
  SHOW_PRODUCT_INFO,
  HIDE_PRODUCT_INFO
} from './../constants/cart';

export const initState = {
  isCartOpened: false,
  quantityOrderedProducts: 0,
  helpText: '',
  isShownHelpText: false,
  isProductAdded: false,
  isRequesting: false,
  productModalInfo: {
    name: '',
    quantity: 0,
    length: 0,
    thickness: 0,
    width: 0
    // There is additional characteristics go as ...rest in the product info.
    // You can see them in AddProductFormContainer's properties. Sorry for this.
  },
  isProductInfoOpened: false
};

let isSetLastProductLength = false;

const cart = (state = initState, action, isNotTest=true) => {
  let quantityOrderedProducts, index, storeName;
  isSetLastProductLength = isNotTest;

  switch (action.type) {
    case SHOW_PRODUCT_INFO:

      return {
        ...state,
        productModalInfo: {
          ...action.productModalInfo
        },
        isProductInfoOpened: true

      };

    case HIDE_PRODUCT_INFO:

      return {
        ...state,
        productModalInfo: {
          ...initState.productModalInfo
        },
        isProductInfoOpened: false
      };

    case RESET_ADD_TO_CART_FORM:
      return {
        ...state,
        isProductAdded: false,
        helpText: ''
      };

    case SHOW_ACTION:
      return { ...state,
        isRequesting: true
      };

    case OPEN_CART:
      return { ...state,
        isCartOpened: action.id
      };

    case CLOSE_CART:
      return {
        ...state,
        isCartOpened: false
      };

    case PUT_PRODUCT:
      storeName = action.store;

      getProducts(storeName).then((cartProducts) => {

        cartProducts = cartProducts ? cartProducts : [];
        const updatedCartProducts = [...cartProducts, action.product];

        localforage.setItem(storeName, updatedCartProducts);
      });

      quantityOrderedProducts = state.quantityOrderedProducts+1;

      setLastProductLength(quantityOrderedProducts);

      return {
        ...state,
        isProductAdded: true,
        isRequesting: false,
        helpText: 'Вы успешно добавили продукт в корзинуʕʘ̅͜ʘ̅ʔ.',
        quantityOrderedProducts
      };

    case DELETE_PRODUCT:
      storeName = action.store;
      index = action.id;

      getProducts(storeName).then((cartProducts) => {
        cartProducts = cartProducts ? cartProducts : [];

        const updatedCartProducts = [...cartProducts.slice(0, index), ...cartProducts.slice(index+1)];

        localforage.setItem(storeName, updatedCartProducts);
      });

      quantityOrderedProducts = state.quantityOrderedProducts-1;

      setLastProductLength(quantityOrderedProducts);

      return {
        ...state,
        quantityOrderedProducts
      };

    case CHANGE_PRODUCT_QUANTITY:
      storeName = action.store;
      index = action.id;

      getProducts(storeName).then((cartProducts) => {
        cartProducts = cartProducts ? cartProducts : [];

        const updatedCartProducts = [
          ...cartProducts.slice(0, index),
          {
            ...cartProducts[index],
            quantity: action.quantity
          },
          ...cartProducts.slice(index + 1)
        ];

        localforage.setItem(storeName, updatedCartProducts);
        setLastProductLength(updatedCartProducts.length);

      });

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

      return {
        ...state,
        quantityOrderedProducts: Number(localStorage.lastProductsLength) || 0
      };
  }
};

function getProducts(storeName) {
  return localforage.getItem(storeName);
}

function setLastProductLength(cartProductsLength) {
  if (isSetLastProductLength) {
    localStorage.lastProductsLength = cartProductsLength;
  }
}

export default cart;
