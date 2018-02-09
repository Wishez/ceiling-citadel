import {
	REQUEST_CATALOG,
	RETRIEVE_CATEGORY,
	RETRIEVE_PRODUCTS,
	RETRIEVE_PRODUCT,
	RETRIEVE_COLLECTION,
	RETRIEVE_BRAND,
	RETRIEVE_CATALOG,
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
	brandUrl,
	catalogUrl
} from './../constants/conf';
import { localData } from './../constants/pureFunctions';

export const retrieveEntity = (type , id) => ({
	type: type,
	id
});
export const retriveCatalog = () => ({
	type: RETRIEVE_CATALOG
});


export const requestCatalog = () => ({
	type: REQUEST_CATALOG
});

export const tryRetrieveCatalogEntity = (name, id) => dispatch => {
	let url = '', type = '';
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
			return false;
	} 


	return customAjaxRequest({
		url: `${url}${id}/`,
		data: {
			"uuid": id
		},
        cache: true,
        isSettingAccept: false,
        success: response => {
        	
			localData.set(name, response.body)
			console.log(type, id, 'type and id');
			dispatch(retrieveEntity(type, id));

			
	    },
        failure: error => {
			throw new Error(`Somethin going wrong ${error.message}`);
        }
	});
};
function extractData(data) {
	const newData = {};

	for (const prop in data) {
		const section = data[prop];

		const newSection = {};

		section.forEach(item => {
			newSection[item.slug] = item;
		});

		newData[prop] = newSection;
	}

	return newData;
}

export const tryFetchCatalog = () => dispatch => {

	dispatch(requestCatalog());

	return customAjaxRequest({
		data: {},
        cache: true,
        url: catalogUrl,
        success: response => {
        	const newData = extractData(response.body);

			localData.set(CATALOG, newData)
			dispatch(retriveCatalog());

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
		dispatch(tryRetrieveCatalogEntity(name, id));
		return false;
	} 

	return localData.get(name);
};
