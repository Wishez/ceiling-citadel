import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getClass from './../../constants/classes';
import {CATALOG, COLLECTION, CATEGORY} from './../../constants/catalog';
import {localData, transformName} from './../../constants/pureFunctions';
import {catalogSectionCombiner, findUUID} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BaseCatalogContainer from './BaseCatalogContainer';

import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
// import Loader from './../../components/Loader';

class BrandCategoryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    COLLECTION: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: '',
    categoryName: ''
  }

  componentDidMount() {
    
    const {dispatch, match} = this.props;
    const {collectionSlug, categorySlug} = match.params;
    const catalog = localData.get(CATALOG);
    
    if (catalog !== null && categorySlug in catalog.categories) {
      const category = catalog.categories[categorySlug];

      const id = findUUID(category.collections, collectionSlug);
    
      this.setState({
        categoryName: transformName(category.name),
        id
      });
    }
    
  }

  render() {        
    const {
      dispatch,
      isRequesting
    } = this.props;
    const {url} = this.props.match;
    const {id, categoryName} = this.state;

    let collection = false,
      slogan = '',
      collectionName = '';

    if (id) {
      // fetchCatalogEntityOrGetLocale can return false.
      collection = dispatch(fetchCatalogEntityOrGetLocale(COLLECTION, id));
    } 

    if (collection) {
      collectionName = transformName(collection.name);
      slogan = collection.slogan;
    }
    
    return (
      <BaseCatalogContainer name={collectionName}
        slogan={slogan}
        routes={{
          '/catalog': 'Каталог',
          '/catalog/category': false,
          '/catalog/category/:categorySlug': categoryName,
          '/catalog/category/:categorySlug/:collectionSlug': collectionName
        }}
        CONSTANT={COLLECTION}
      >
        <CatalogSection name="Образцы" headerId="collections">
          {!isRequesting && 
            collection ?
            catalogSectionCombiner(collection.collection_items, url, true) : '' 
          }
        </CatalogSection>
      </BaseCatalogContainer>
    );
  }
}

const mapStateToProps = state => {
  const { catalog } = state;
  const { 
    isRequesting
  } = catalog;

  return {
    COLLECTION: catalog.COLLECTION,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(BrandCategoryContainer));
