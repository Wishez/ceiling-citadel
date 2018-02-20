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
  CATALOG,
  LAST_ALBUM,
  SET_FOUND_ENTITIES,
  FIND_ENTITIES,
  SEARCH_COLLECTION_STORE,
  SEARCH_PRODUCTS_STORE,
  SEARCH_CATEGORIES_STORE,
  SEARCH_BRANDS_STORE,
  CLEAN_SEARCH_ENTITIES

} from './../constants/catalog';

import customAjaxRequest from './../constants/ajax';

import {
  categoryUrl, 
  productUrl, 
  collectionUrl, 
  brandUrl,
  catalogUrl,
  productAlbumUrl,
  catalogBrandUrl,
  catalogCategoryUrl,
  catalogCollectionUrl,
} from './../constants/conf';
import { localData, getArray } from './../constants/pureFunctions';

export const retrieveEntity = (type , id) => ({
  type: type,
  id
});
export const retriveCatalog = () => ({
  type: RETRIEVE_CATALOG
});


export const findEntities = () => ({
  type: FIND_ENTITIES
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
      'uuid': id
    },
    cache: true,
    isSettingAccept: false,
    success: response => {
        	const entity = response.body;

      localData.set(name, entity);
			
      const slug = 'album' in entity && entity.album;
			
      if (slug) {
        getAlbum(slug, () => {
          dispatch(retrieveEntity(type, id));	
        });
      } else {
        dispatch(retrieveEntity(type, id));
      }
			
	    },
    failure: error => {
      throw new Error(`Somethin going wrong ${error.message}`);
    }
  });
};

function getAlbum(slug, callback) {
  return customAjaxRequest({
    url: `${productAlbumUrl}${slug}/`,
    cache: true,
    data: {},
    success: response => {
      
      localData.set(LAST_ALBUM, {
        slug: slug,
        images: response.body.images
      });
      callback();
	    },
    failure: error => {
      throw new Error(`Somethin going wrong ${error.message}`);
    }
  });
}
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

export const tryFetchCatalog = (callback=false, silentUpdate=false) => dispatch => {
  if (!silentUpdate) {
    console.log('is silent mode', silentUpdate);
    dispatch(requestCatalog());
  }

  return customAjaxRequest({
    data: {},
    cache: true,
    url: catalogUrl,
    success: response => {
      const newData = extractData(response.body);

      localData.set(CATALOG, newData);
    
      if (!silentUpdate) {
        console.log('retrieve is silent mode', silentUpdate);
        dispatch(retriveCatalog());
      }

      if (callback)
        callback();
	    },
    failure: error => {
      throw new Error(`Somethin going wrong ${error.message}`);
    }
  });
};

export const fetchCatalogEntityOrGetLocale = (name, id) => 
  (dispatch, getStore) => {
    const catalog = getStore().catalog;
	
    if (catalog[name] !== id || catalog.isRefetching) {
      dispatch(tryRetrieveCatalogEntity(name, id));
      return false;
    } 

    return localData.get(name);
  };

export const setFoundEntities = foundEntities => ({
  type: SET_FOUND_ENTITIES,
  foundEntities
});

const filterEntities = (array, callback) => (
  array
    .map(callback)
    .filter(entity => entity)
);

const getMatchedEntity = (
  string, 
  searchedValue, 
  callback
) => {
  const isThereEntity  = new RegExp(searchedValue, 'ig').test(string);

  if (isThereEntity) {
    return callback();
  }

  return false;

};

const getFoundEntities = (
  array,
  value,
  pathTo,
  signification
) => ({
  name: signification,
  items: filterEntities(array, 
    entity => getMatchedEntity(
      entity.name,
      value,
      () => ({
        name: entity.name,
        url: `${pathTo}${entity.slug}/`
      })
    ))
});


export const dumpEntitiesForSearch = (catalog) => {	
  const brands = getArray(catalog.brands);
  const categories = getArray(catalog.categories);
  let products = [];
  const collections = brands.reduce((collections, brand) => (
    // Concat collections with needed properties of a collection.
    collections.concat(
      brand.collections.map(
        collection => {
          // Compose url to a collection.
          const collectionUrl = `/catalog/brand/${brand.slug}/${collection.slug}/`;
          // Get and compose products of a collection.
          const collectionProducts = collection.collection_items
            .map(product => ({
              name: product.name,
              url: `${collectionUrl}${product.slug}/`
            }));

          // Concat the bunch of products.
          products = products.concat(collectionProducts);

          // Return for the array collection data.
          return {
            name: collection.name,
            url: collectionUrl
          };
        }
      )// end brand.collections.map
    ) // end collections.concat
  ), // end callback of brands.reduce
  []); // end brands.reduce

  localData.set(
    SEARCH_BRANDS_STORE, 
    brands
  );
	
  localData.set(
    SEARCH_CATEGORIES_STORE, 
    categories
  );

  localData.set(
    SEARCH_COLLECTION_STORE, 
    collections
  ); // end localData.set

  localData.set(SEARCH_PRODUCTS_STORE, products);
};

export const findEntitiesAndShowResults = value => dispatch => {
  dispatch(findEntities());

  const brands = localData.get(SEARCH_BRANDS_STORE) || [];
  const categories = localData.get(SEARCH_CATEGORIES_STORE) || [];
  const products = localData.get(SEARCH_PRODUCTS_STORE) || [];
  const collections = localData.get(SEARCH_COLLECTION_STORE) || [];
	
  dispatch(
    setFoundEntities([
      getFoundEntities(
        brands, 
        value, 
        catalogBrandUrl,
        'Бренды'
      ),
      {
        name: 'Категории',
        items: filterEntities(
          categories, 
          category => getMatchedEntity(
            category.name,
            value,
            () => ({
              name: `${category.name} | ${category.section}`,
              url: `${catalogCategoryUrl}${category.slug}/`
            })
          )
        )
      },
      {
        name: 'Коллекции',
        items: filterEntities(
          collections, 
          collection => getMatchedEntity(
            collection.name,
            value,
            () => (collection)
          )
        )
      },
      {
        name: 'Образцы',
        items: filterEntities(
          products, 
          product => getMatchedEntity(
            product.name,
            value,
            () => (product)
          )
        )
      }
    ].filter(section => section.items.length)
    ));
};

export const cleanSearchEntities = () => ({
  type: CLEAN_SEARCH_ENTITIES
});
export const fetchCatalogIfNeededAndDumpEntities = () => (dispatch, getStore) => {
  const catalog = localData.get(CATALOG);
  const isRequesting = getStore().catalog.isRequesting;

  if (!catalog && !isRequesting) {
    dispatch(tryFetchCatalog(() => {
      dumpEntitiesForSearch(localData.get(CATALOG));
    }));
  } else {
    dispatch(tryFetchCatalog(() => {
      dumpEntitiesForSearch(localData.get(CATALOG));
    }, true));
  }
  
};
