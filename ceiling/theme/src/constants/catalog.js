export const REQUEST_CATALOG = 'REQUEST_CATALOG';
export const RETRIEVE_CATEGORY = 'RETRIEVE_CATEGORY';
export const RETRIEVE_CATALOG = 'RETRIEVE_CATALOG';
export const RETRIEVE_PRODUCT = 'RETRIEVE_PRODUCT';
export const RETRIEVE_COLLECTION = 'RETRIEVE_COLLECTION';
export const RETRIEVE_BRAND = 'RETRIEVE_BRAND';
export const SET_FOUND_ENTITIES = 'SET_FOUND_ENTITIES';
export const REFETCH_DATA = 'REFETCH_DATA';
export const FIND_ENTITIES = 'FIND_ENTITIES';

export const CLEAN_SEARCH_ENTITIES = 'CLEAN_SEARCH_ENTITIES';
export const SEARCH_COLLECTION_STORE = 'SEARCH_COLLECTION_STORE';
export const SEARCH_PRODUCTS_STORE = 'SEARCH_PRODUCTS_STORE';
export const SEARCH_CATEGORIES_STORE = 'SEARCH_CATEGORIES_STORE';
export const SEARCH_BRANDS_STORE = 'SEARCH_BRANDS_STORE';

export const LAST_ALBUM = 'LAST_ALBUM';

export const CATEGORY = 'CATEGORY';
export const PRODUCT = 'PRODUCT';
export const COLLECTION = 'COLLECTION';
export const BRAND = 'BRAND';
export const CATALOG = 'CATALOG';

import * as localForage from 'localforage';
console.log(localForage);
// const catalogStore = localForage.config({
//   name: 'ART_CEIL_CATALOG_STORE',
//   storeName: 'ART_CEIL_CATALOG_STORE_01'
// });
const catalogStore = localForage;
export default catalogStore;
