import {
  REQUEST_CATALOG,
  RETRIEVE_CATEGORY,
  RETRIEVE_PRODUCT,
  RETRIEVE_COLLECTION,
  RETRIEVE_BRAND,
  REFETCH_DATA,
  RETRIEVE_CATALOG,
  SET_FOUND_ENTITIES,
  FIND_ENTITIES,
  CLEAN_SEARCH_ENTITIES,
  SET_LAST_SHOWN_VIEW
} from './../constants/catalog';

/*
 * State:
 */


const fetchState = {
  isRequesting: false,
  isRefetching: false
};

export const initState = {
  helpText: '',
  BRAND: false,
  CATEGORY: false,
  COLLECTION: false,
  PRODUCT: false,
  CATALOG: false,
  searchedEntities: [],
  isFinding: false,
  lastShownView: {
    name: '',
    type: ''
  },
  ...fetchState
};

const catalog = (
  state=initState,
  action
) => {

  switch (action.type) {
    case SET_LAST_SHOWN_VIEW:
      return {
        ...state,
        lastShownView: {
          ...action.lastShownView
        }
      };
    case CLEAN_SEARCH_ENTITIES:
      return {
        ...state,
        searchedEntities: []
      };
    case SET_FOUND_ENTITIES:
      return {
        ...state,
        isFinding: false,
        searchedEntities: action.foundEntities,
      };
    case FIND_ENTITIES:
      return {
        ...state,
        isFinding: true
      };
    case REQUEST_CATALOG:
      return {
        ...state,
        isRequesting: true
      };
    case RETRIEVE_CATALOG:
      return {
        ...state,
        ...fetchState
      };
    case RETRIEVE_CATEGORY:
      return {
        ...state,
        CATEGORY: action.id,
        ...fetchState
      };
    case RETRIEVE_PRODUCT:
      return {
        ...state,
        PRODUCT: action.id,
        ...fetchState
      };
    case RETRIEVE_COLLECTION:
      return {
        ...state,
        COLLECTION: action.id,
        ...fetchState
      };
    case RETRIEVE_BRAND:
      return {
        ...state,
        BRAND: action.id,
        ...fetchState
      };
    case REFETCH_DATA:
      return {
        ...state,
        isRefetching: true
      };
    default:
      return state;
  }
};

export default catalog;
