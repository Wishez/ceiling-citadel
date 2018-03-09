import React from 'react';
import CatalogItem from './../components/Catalog/CatalogItem';
import Fading from './../components/Animation/Fading';
import {catalogBrandUrl, catalogCategoryUrl} from './conf';
import {getArray} from './pureFunctions';
import  CatalogSubsection from './../components/Catalog/CatalogSubsection';
import getClass from './classes';


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
export const findUUID = (array, slug) => {
  const item = array.filter(item => (item.slug === slug));

  if (item.length)
    return item[0].uuid;
  return false;
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

const combineCatalogSimpleItem = props => ( 
  props.item.is_shown ? 
    // <Fading key={props.key}>
    <CatalogItem {...props}/> 
    // </Fading>
    : ''
);
  

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

  // Generate subsections of section.
  items
    .forEach((item, index) => {
      const subsection = item[sectionPropertyName];
      const slug = item.slug;
      const name = item.name;
      // Create object or go next
			
      if (!(subsection in subsections)) {
        subsections[subsection] = {
          name: subsection,
          items: [],
          headerId: slug
        };
      }
      // Cache
      const newSubsection = subsections[subsection];

      // Will push to newSection's items;
      // Combine items.
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

function fixUrl(url) {
  return url.lastIndexOf('/') !== url.length - 1 ? `${url}/` : url;
}
