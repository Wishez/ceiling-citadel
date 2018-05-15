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
  catalogCategoryUrl
} from './../constants/conf';
import { getArray } from './../constants/pureFunctions';

export const retrieveEntity = (type, id) => ({
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
  let url = '',
    type = '';
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
      uuid: id
    },
    cache: true,
    isSettingAccept: false,
    success: response => {
      const entity = response.body;

      return localforage.setItem(name, entity, function() {
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
      localforage.setItem(LAST_ALBUM, {
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

export const tryFetchCatalog = (
  callback = false,
  silentUpdate = false
) => dispatch => {

  dispatch(requestCatalog());

  return customAjaxRequest({
    data: {},
    cache: true,
    url: catalogUrl,
    success: response => {
      const newData = extractData(response.body);

      localforage.setItem(CATALOG, newData, function(catalog) {
        dispatch(retriveCatalog());

        if (callback) callback();
      });
    },
    failure: error => {
      throw new Error(`Somethin going wrong ${error.message}`);
    }
  });
};

export const fetchCatalogEntityOrGetLocale = (name, id, force = false) => (
  dispatch,
  getStore
) => {
  const catalog = getStore().catalog;

  if (force || (catalog[name] !== id || catalog.isRefetching)) {
    dispatch(tryRetrieveCatalogEntity(name, id));
    return false;
  }

  const request = localforage.getItem(name);

  return request;
};

export const setFoundEntities = foundEntities => ({
  type: SET_FOUND_ENTITIES,
  foundEntities
});

const filterEntities = (array, callback) =>
  array.map(callback).filter(entity => entity);

const getMatchedEntity = (string, searchedValue, callback) => {
  const isThereEntity = new RegExp(searchedValue, 'ig').test(string);

  if (isThereEntity) {
    return callback();
  }

  return false;
};

const getFoundEntities = (array, value, pathTo, signification) => ({
  name: signification,
  items: filterEntities(array, entity =>
    getMatchedEntity(entity.name, value, () => ({
      name: entity.name,
      url: `${pathTo}${entity.slug}/`
    }))
  )
});

export const dumpEntitiesForSearch = catalog => {
  const brands = getArray(catalog.brands).filter(brand => brand.is_shown);
  const categories = getArray(catalog.categories).filter(
    category => category.is_shown
  );

  let products = [];

  const collections = brands.reduce(combineBrandsCollections, []);

  function combineBrandsCollections(combinedCollections, brand) {
    const brandCollections = brand.collections.reduce(makeCollections, []);

    function makeCollections(accumulatedBrandCollections, collection) {
      if (collection.is_shown) {
        const collectionUrl = `/catalog/brand/${brand.slug}/${
          collection.slug
        }/`;

        const collectionProducts = collection.collection_items.map(makeProduct);

        function makeProduct(product) {
          return {
            name: product.name,
            url: `${collectionUrl}${product.slug}/`
          };
        }

        products = products.concat(collectionProducts);

        accumulatedBrandCollections = [
          ...accumulatedBrandCollections,
          {
            name: collection.name,
            url: collectionUrl
          }
        ];
      }

      return accumulatedBrandCollections;
    }

    return [...combinedCollections, brandCollections];
  }

  localforage.setItem(SEARCH_BRANDS_STORE, brands);

  localforage.setItem(SEARCH_CATEGORIES_STORE, categories);

  localforage.setItem(SEARCH_COLLECTION_STORE, collections);

  localforage.setItem(SEARCH_PRODUCTS_STORE, products);
};

export const findEntitiesAndShowResults = value => dispatch => {
  dispatch(findEntities());

  localforage.getItem(SEARCH_BRANDS_STORE).then(brands => {
    localforage.getItem(SEARCH_CATEGORIES_STORE).then(categories => {
      localforage.getItem(SEARCH_PRODUCTS_STORE).then(products => {
        localforage.getItem(SEARCH_COLLECTION_STORE).then(collections => {

          dispatch(
            setFoundEntities(
              [
                getFoundEntities(brands, value, catalogBrandUrl, 'Бренды'),
                {
                  name: 'Категории',
                  items: filterEntities(categories, category =>
                    getMatchedEntity(category.name, value, () => ({
                      name: `${category.name} | ${category.section}`,
                      url: `${catalogCategoryUrl}${category.slug}/`
                    }))
                  )
                },
                {
                  name: 'Коллекции',
                  items: filterEntities(collections, collection =>
                    getMatchedEntity(collection.name, value, () => collection)
                  )
                },
                {
                  name: 'Образцы',
                  items: filterEntities(products, product =>
                    getMatchedEntity(product.name, value, () => product)
                  )
                }
              ].filter(section => section.items.length)
            )
          ); // end setFoundEntities and dispatch
        }); // end SEARCH_COLLECTION_STORE
      }); // end SEARCH_PRODUCTS_STORE
    }); // end SEARCH_CATEGORIES_STORE
  }); // end SEARCH_BRANDS_STORE
};

export const cleanSearchEntities = () => ({
  type: CLEAN_SEARCH_ENTITIES
});

export const fetchCatalogIfNeededAndDumpEntities = () => (
  dispatch,
  getStore
) => {
  localforage.getItem(CATALOG, function(err, catalog) {
    const isRequesting = getStore().catalog.isRequesting;
    let isSilentRequest = false;

    if (catalog && isRequesting) {
      isSilentRequest = true;
    }

    dispatch(
      tryFetchCatalog(dumpEntitiesAfterFetching, isSilentRequest)
    );

  });
};

function dumpEntitiesAfterFetching() {
  localforage.getItem(CATALOG, function(err, catalog) {
    dumpEntitiesForSearch(catalog);
  });
}
