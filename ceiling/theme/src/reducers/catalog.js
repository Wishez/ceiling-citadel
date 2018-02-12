import {
	REQUEST_CATALOG,
	RETRIEVE_CATEGORY,
	RETRIEVE_PRODUCTS,
	RETRIEVE_PRODUCT,
	RETRIEVE_COLLECTION,
	RETRIEVE_BRAND,
	REFETCH_DATA,
	RETRIEVE_CATALOG,
	BRAND,
	COLLECTION,
	CATEGORY,
	PRODUCT,
	CATALOG,
	SET_FOUND_ENTITIES,
	FIND_ENTITIES,
	CLEAN_SEARCH_ENTITIES
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
	searchEntities: [],
	isFinding: false,
	...fetchState
};

const catalog = (
	state=initState,
	action
) => {
	
	switch (action.type) {
		case CLEAN_SEARCH_ENTITIES:
			return {
				...state,
				searchEntities: []
			}
		case SET_FOUND_ENTITIES:
			return {
				...state,
				isFinding: false,
				searchEntities: action.foundEntities,
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
}

export default catalog;