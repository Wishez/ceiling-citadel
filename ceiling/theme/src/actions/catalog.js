import {
	REQUEST_CATALOG,
	RETRIEVE_CATEGORY,
	RETRIEVE_PRODUCTS,
	RETRIEVE_SINGLE_PRODUCT,
	RETRIEVE_COLLECTION,
	RETRIEVE_BRAND,
	BRAND,
	COLLECTION,
	CATEGORY,
	PRODUCT,
	CATALOG
} from './../constants/catalog';

import customAjaxRequest from './../constants/ajax';
import {
	categoryUrl, 
	productUrl, 
	collectionUrl, 
	brandUrl
} from './../constants/conf';
import { localData } from './../constants/pureFunctions';

export retrieveEntity = (type , id) => ({
	type: type,
	id
})
export const retrieveCategory = id => ({
	type: RETRIEVE_CATEGORY,
	id
});

export const retrieveProduct = id => ({
	type: RETRIEVE_PRODUCT,
	id
});
export const retrieveCollection = id => ({
	type: RETRIEVE_COLLECTION,
	id
});
export const retrieveBrand = id => ({
	type: RETRIEVE_BRAND,
	id
});
export const requestCatalog = () => ({
	type: REQUEST_CATALOG,
	id
});

export const tryRetrieveCatalogEntity = (name, id) => dispatch => {
	let url, type = '', '';
	name = name.toUpperCase();
	
	dispatch(requestCatalog());

	switch (name) {
		case BRAND:
			url = brandUrl;
			type = RETRIEVE_BRAND;
			break;
		case COLLECTION:
			url = collectionUrl;
			type = RETRIEVE_COLLECTION;
			break;
		case CATEGORY:
			url = categoryUrl;
			type = RETRIEVE_CATEGORY;
			break;
		case PRODUCT:
			url = productUrl;
			type = RETRIEVE_PRODUCT;
			break;
		default:
			url = catalogUrl;
			name = CATALOG;
			type = RETRIEVE_CATALOG;
			break;
	} 


	return customAjaxRequest({
		url,
		data: {
			"uuid": id
		},
        cache: true,
        success: response => {
        	console.log(response)
			localData.set(name, response.body)
			dispatch(retrieveEntity(type, id));
	    },
        failure: error => {
			throw new Error(`Somethin going wrong ${error.message}`);
        }
	});
};


export const fetchCatalogEntityOrGetLocale = (name, id) => 
	(dispatch, getStore) =>  {
	const catalog = getStore().catalog;
	
	if (catalog[name] !== id || catalog.isRefetching) {
		dispatch(tryRetrieveCatalogEntity(name, id, callback));
		return false;
	} 

	return localData.get(name);
};