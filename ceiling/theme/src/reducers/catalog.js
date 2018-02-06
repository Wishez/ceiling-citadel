import {
	REQUEST_CATALOG,
	RETRIEVE_CATEGORY,
	RETRIEVE_PRODUCTS,
	RETRIEVE_SINGLE_PRODUCT,
	RETRIEVE_COLLECTION,
	RETRIEVE_BRAND,
	REFETCH_DATA,
	RETRIEVE_CATALOG,
	CHANGE_STEPS,
	BRAND,
	COLLECTION,
	CATEGORY,
	PRODUCT,
	CATALOG
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
	isCatalogShow: true,
	BRAND: false,
	CATEGORY: false,
	COLLECTION: false,
	PRODUCT: false,
	CATALOG: false,
	shown: CATALOG,
	steps: [{
		name: CATALOG,
		id: false,
		url: '/catalog'
	}],
	...fetchState
};

const catalog = (
	state=initState,
	action
) => {
	
	switch (action.type) {
		case CHANGE_STEPS:
			const stepName = action.step.name;
			let index = state.steps.length;
			let i = 0;

			for (const step of state.steps) {
				if (step.name === stepName) {
					index = i;
					break;
				}

				i += 1;
			}

			return {
				...state,
				steps: [
					state.steps.slice(0, index + 1),
					step.step
				]
			};
		case REQUEST_CATALOG:
			return {
				...state,
				isRequesting: true
			};
		case RETRIEVE_CATALOG:
			return {
				...state,
				shown: CATALOG,
				...fetchState
			};
		case RETRIEVE_CATEGORY:
			return {
				...state,
				shown: CATEGORY,
				CATEOGRY: action.id,
				...fetchState
			};
		case RETRIEVE_SINGLE_PRODUCT:
			return {
				...state,
				shown: PRODUCT,
				PRODUCT: action.id,
				...fetchState
			};
		case RETRIEVE_COLLECTION:
			return {
				...state,
				shown: COLLECTION,
				COLLECTION: action.id,
				...fetchState
			};
		case RETRIEVE_BRAND:
			return {
				...state,
				shown: BRAND,
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