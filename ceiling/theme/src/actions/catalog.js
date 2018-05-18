import {
  REQUEST_CATALOG,
  RETRIEVE_CATEGORY,
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
  CLEAN_SEARCH_ENTITIES,
  PRODUCT_SLUG,
  SET_LAST_SHOWN_VIEW
} from '@/constants/catalog';
import customAjaxRequest from '@/constants/ajax';
import {
  categoryUrl,
  productUrl,
  collectionUrl,
  brandUrl,
  catalogUrl,
  productAlbumUrl,
  catalogBrandUrl,
  catalogCategoryUrl,
  productSlugUrl
} from '@/constants/conf';
import { getArray } from '@/constants/pureFunctions';

export const setLastShownView = ({
  name,
  type
}) => ({
  type: SET_LAST_SHOWN_VIEW,
  lastShownView: {
    name,
    type
  }
});



export const tryRetrieveCatalogEntity = (name, id, isRequestinBySlug) => dispatch => {
  dispatch(requestCatalog());

  const entityName = name.toUpperCase();
  const entityRequestInfo = getEntityRequestInfo(isRequestinBySlug ? PRODUCT_SLUG : entityName);
  const url = entityRequestInfo.url;
  const type = entityRequestInfo.type;

  return customAjaxRequest({
    url: `${url}${id}/`,
    data: {
      uuid: id
    },
    cache: true,
    isSettingAccept: false,
    success: response => {
      const entity = response.body;

      return localforage.setItem(entityName, entity, function() {
        const slug = 'album' in entity && entity.album;

        if (slug) {
          getAlbum({
            onLoad: saveEntityInfoInStore,
            slug
          });
        } else {
          saveEntityInfoInStore();
        }

        function saveEntityInfoInStore() {
          dispatch(retrieveEntity(type, id));
        }
      });
    },
    failure: error => {
      throw new Error(`Somethin going wrong ${error.message}`);
    }
  });
};

export const retrieveEntity = (type, id) => ({
  type: type,
  id
});


export const catalogRequests = {
  [BRAND]: {
    url: brandUrl,
    type: RETRIEVE_BRAND
  },
  [COLLECTION]: {
    url: collectionUrl,
    type: RETRIEVE_COLLECTION
  },
  [CATEGORY]: {
    url: categoryUrl,
    type: RETRIEVE_CATEGORY
  },
  [PRODUCT]: {
    url: productUrl,
    type: RETRIEVE_PRODUCT
  },
  [PRODUCT_SLUG]: {
    url: productSlugUrl,
    type: RETRIEVE_PRODUCT
  }
};

export function getEntityRequestInfo(entityName) {
  let entityRequestInfo = null;

  try {
    entityRequestInfo = catalogRequests[entityName];
  } catch (e) {
    throw new Error('There is not such entities in the catalog.');
  }

  return entityRequestInfo;
}

function getAlbum({ slug, onLoad }) {
  return customAjaxRequest({
    url: `${productAlbumUrl}${slug}/`,
    cache: true,
    data: {},
    success: response => {
      localforage.setItem(LAST_ALBUM, {
        slug: slug,
        images: response.body.images
      });

      onLoad();
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

    dispatch(tryFetchCatalog(dumpEntitiesAfterFetching, isSilentRequest));
  });
};

export const tryFetchCatalog = (callback = false) => dispatch => {
  dispatch(requestCatalog());

  return customAjaxRequest({
    data: {},
    cache: true,
    url: catalogUrl,
    success: response => {
      const newData = extractData(response.body);

      localforage.setItem(
        CATALOG,
        newData,
        retriveCatalogAndMakeCallbackIfNeeded
      );

      function retriveCatalogAndMakeCallbackIfNeeded() {
        dispatch(retriveCatalog());

        if (callback) callback();
      }
    },
    failure: error => {
      throw new Error(`Somethin going wrong ${error.message}`);
    }
  });
};

function dumpEntitiesAfterFetching() {
  localforage.getItem(CATALOG, function(err, catalog) {
    dumpEntitiesForSearch(catalog);
  });
}

export const requestCatalog = () => ({
  type: REQUEST_CATALOG
});

export const retriveCatalog = () => ({
  type: RETRIEVE_CATALOG
});

export const fetchCatalogEntityOrGetLocale = (name, id, force = false, isRequestinBySlug=false) => (
  dispatch,
  getStore
) => {
  const catalog = getStore().catalog;

  if (force || (catalog[name] !== id || catalog.isRefetching)) {
    dispatch(tryRetrieveCatalogEntity(name, id, isRequestinBySlug));
    return false;
  }

  const request = localforage.getItem(name);

  return request;
};

export const dumpEntitiesForSearch = catalog => {
  const brands = getArray(catalog.brands).filter(brand => brand.is_shown);
  const categories = getArray(catalog.categories).filter(
    category => category.is_shown
  );

  let products = [];

  const collections = [].concat(...brands.reduce(combineBrandsCollections, []));

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

export const findEntities = () => ({
  type: FIND_ENTITIES
});

export const setFoundEntities = foundEntities => ({
  type: SET_FOUND_ENTITIES,
  foundEntities
});

const filterEntities = (array, callback) =>
  array.map(callback).filter(entity => entity);

const getMatchedEntity = (string, searchedValue, callback) => {
  const isThereEntity = new RegExp(searchedValue, 'ig').test(string);

  return isThereEntity && callback();
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

export const cleanSearchEntities = () => ({
  type: CLEAN_SEARCH_ENTITIES
});
