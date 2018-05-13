import catalogStore, {
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
import { getArray } from './../constants/pureFunctions';

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

      return catalogStore.setItem(name, entity, function() {

        const slug = 'album' in entity && entity.album;

        if (slug) {
          getAlbum(slug, () => {
            dispatch(retrieveEntity(type, id));
          });
        } else {
          dispatch(retrieveEntity(type, id));
        }

      });
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

      // localData.set(LAST_ALBUM, {
      //   slug: slug,
      //   images: response.body.images
      // });
      catalogStore.setItem(LAST_ALBUM, {
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
  // Update catalog.
  dispatch(requestCatalog());
  // if (silentUpdate) {

  // }

  return customAjaxRequest({
    data: {},
    cache: true,
    url: catalogUrl,
    success: response => {
      const newData = extractData(response.body);

      // localData.set(CATALOG, newData);

      catalogStore.setItem(CATALOG, newData, function(catalog) {
        // if (silentUpdate) {
        dispatch(retriveCatalog());
        // }
        if (callback)
          callback();
      });

	   },
    failure: error => {
      throw new Error(`Somethin going wrong ${error.message}`);
    }
  });
};

export const fetchCatalogEntityOrGetLocale = (name, id, force=false) =>
  (dispatch, getStore) => {
    const catalog = getStore().catalog;

    if (force || (catalog[name] !== id || catalog.isRefetching)) {
      dispatch(tryRetrieveCatalogEntity(name, id));
      return false;
    }

    const request = catalogStore.getItem(name);

    return request;

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
  items: filterEntities(
    array,
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
  const brands = getArray(catalog.brands)
    .filter(brand => brand.is_shown);
  const categories = getArray(catalog.categories)
    .filter(category => category.is_shown);

  let products = [];

  const collections = brands.reduce((collections, brand) => (
    // Concat collections with needed properties of a collection.
    collections.concat(
      brand.collections.reduce(
        (resultCollections,
          collection) => {
          // Check for showing product when user researchs it..
          if (collection.is_shown) {
            // Compose url to a collection.
            const collectionUrl = `/catalog/brand/${brand.slug}/${collection.slug}/`;

            // Get and compose products of a collection.
            const collectionProducts = collection
              .collection_items
              .map(product => {

                return {
                  name: product.name,
                  url: `${collectionUrl}${product.slug}/`
                };

              });

            // Concat the bunch of products.
            products = products.concat(collectionProducts);

            // Return for the array collection data.
            return [
              ...resultCollections,
              {
                name: collection.name,
                url: collectionUrl
              }];

          } // end if

          return resultCollections;
        }, []) // end brand.collections.reduce
    ) // end collections.concat
  ), // end callback of brands.reduce
  []); // end brands.reduce

  catalogStore.setItem(
    SEARCH_BRANDS_STORE,
    brands
  );
  // localData.set(
  //   SEARCH_BRANDS_STORE,
  //   brands
  // );
  catalogStore.setItem(
    SEARCH_CATEGORIES_STORE,
    categories
  );
  // localData.set(
  //   SEARCH_CATEGORIES_STORE,
  //   categories
  // );
  catalogStore.setItem(
    SEARCH_COLLECTION_STORE,
    collections
  ); // end
  // localData.set(
  //   SEARCH_COLLECTION_STORE,
  //   collections
  // ); // end localData.set

  catalogStore.setItem(SEARCH_PRODUCTS_STORE, products);
  // localData.set(SEARCH_PRODUCTS_STORE, products);
};

export const findEntitiesAndShowResults = value => dispatch => {
  dispatch(findEntities());

  // Retrieve brands.
  catalogStore.getItem(SEARCH_BRANDS_STORE).then(brands => {
    // Retrieve categories.
    catalogStore.getItem(SEARCH_CATEGORIES_STORE).then(categories => {
      // Retrieve products.
      catalogStore.getItem(SEARCH_PRODUCTS_STORE).then(products => {
        // Retrieve collections.
        catalogStore.getItem(SEARCH_COLLECTION_STORE).then(collections => {
          // Filter by value and set results to the app's state.
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
            )); // end setFoundEntities and dispatch
        }); // end SEARCH_COLLECTION_STORE
      }); // end SEARCH_PRODUCTS_STORE
    }); // end SEARCH_CATEGORIES_STORE
  }); // end SEARCH_BRANDS_STORE
};

export const cleanSearchEntities = () => ({
  type: CLEAN_SEARCH_ENTITIES
});
export const fetchCatalogIfNeededAndDumpEntities = () => (dispatch, getStore) => {
  catalogStore.getItem(CATALOG, function(err, catalog) {

  // const catalog = localData.get(CATALOG);
    const isRequesting = getStore().catalog.isRequesting;

    if (!catalog && !isRequesting) {
      dispatch(tryFetchCatalog(() => {
      // dumpEntitiesForSearch(localData.get(CATALOG));
        catalogStore.getItem(CATALOG, function(err, catalog) {

          dumpEntitiesForSearch(catalog);

        });

      }));
    } else {
      dispatch(tryFetchCatalog(() => {
        catalogStore.getItem(CATALOG, function(err, catalog) {
          dumpEntitiesForSearch(catalog);
        });
      }, true));
    }

  });
};
