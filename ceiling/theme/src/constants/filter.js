import React from 'react';
import CatalogItem from '@/components/Catalog/CatalogItem';
import {getArray, fixUrl} from './pureFunctions';
import  CatalogSubsection from '@/components/Catalog/CatalogSubsection';



export const makeSelectOptions = options => (
  options ?
    options.map(option => ({
      text: option,
      value: option
    })) :
    []
);

export const makeSelectColorOptions = colors => (
  colors ?
    colors.map(color => ({
      color: color.color,
      value: color.name ,
      showIcon: true,
      text: color.name
    })) :
    []
);
export const findUUID = (items, slug) => {
  const item = items.filter(item => (item.slug === slug));
  const areItemsExist = item.length;
  let firstItemUuid = false;

  if (areItemsExist)
    firstItemUuid = item[0].uuid;

  return firstItemUuid;
};

export const getProductData = (array, collectionSlug, productSlug) => {
  const data = {};
  let collection = array.filter(item => (item.slug === collectionSlug));

  if (collection.length) {
    collection = collection[0];

    return {
      collectionName: collection.name,
      id: findUUID(collection.collection_items, productSlug)
    };
  }
  return false;
};




export const catalogSectionCombiner = (
  items,
  url,
  isSample=false
) => (
  items.map((item, index) => (
    combineCatalogSimpleItem({
      key: index,
      description: item.description,
      name: item.name,
      image: item.preview.image,
      slug: item.slug,
      style: false,
      url: fixUrl(url),
      modifier: isSample ? 'sample' : '',
      isSample,
      item
    })

  ))
);


export const catalogSubsectionsCombiner = (
  items,
  url,
  sectionPropertyName,
  isSample=false
) => {
  const subsections = {};

  items
    .forEach((item, index) => {
      const subsection = item[sectionPropertyName];
      const slug = item.slug;
      const name = item.name;

      if (!(subsection in subsections)) {
        subsections[subsection] = {
          name: subsection,
          items: [],
          headerId: slug
        };
      }

      const newSubsection = subsections[subsection];

      newSubsection.items = [
        ...newSubsection.items,
        combineCatalogSimpleItem({
          key: index,
          description: item.description,
          image: item.preview.image,
          style: false,
          url: fixUrl(url),
          modifier: isSample ? 'sample' : '',
          isSample,
          name,
          slug,
          item
        })
      ];
    });


  return getArray(subsections).map((subsection, index) =>
    <CatalogSubsection key={index} {...subsection}>
      {subsection.items}
    </CatalogSubsection>
  );
};


function combineCatalogSimpleItem(props) {
  return props.item.is_shown ?
    <CatalogItem key={props.key} {...props}/>
    : '';
}
