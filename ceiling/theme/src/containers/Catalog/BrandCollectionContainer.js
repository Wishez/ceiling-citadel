import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import getClass from './../../constants/classes';
import {CATALOG, COLLECTION} from './../../constants/catalog';
import {localData, trasformName} from './../../constants/pureFunctions';
import {catalogItemsCombiner} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BaseCatalogContainer from './BaseCatalogContainer';

import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
import Loader from './../../components/Loader';

class CategoryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    COLLECTION: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: ''
  }

  componentDidMount() {
    
    const {dispatch, match} = this.props;
    const {collectionSlug, brandSlug} = match.params;
    const catalog = localData.get(CATALOG);
    
    if (catalog !== null && brandSlug in catalog.brands) {
        console.log(catalog, collectionSlug, 'collectionSlug');
        
        const id = catalog.brands[brandSlug][collectionSlug].uuid;
        console.log(id, id);
        this.setState({id});
    }
    
  }

  render() {        
    const {
      dispatch,
      isRequesting
    } = this.props;

    const {id} = this.state;

    let collection = false,
        slogan = '',
        collectionName = '',
        brand = '';
    if (id) {
      // fetchCatalogEntityOrGetLocale can return false.
      collection = dispatch(fetchCatalogEntityOrGetLocale(COLLECTION, id));
    } 


    if (collection) {
        collectionName = transformName(collection.name);
        brand = transformName(collection.brand.name);
        slogan = collection.slogan;
    }
    
    return (
      <BaseCatalogContainer name={collectionName}
                slogan={slogan}
                routes={{
                  '/catalog': 'Каталог',
                  '/catalog/collection': false,
                  '/catalog/brand/:brandSlug': brandName,
                  '/catalog/brand/:brandSlug/:collectionSlug': collectionName
                }}
                CONSTANT={COLLECTION}
          >
          <CatalogSection name="Продукты" headerId="collections">
            {/*!isRequesting && 
            collection ?
              catalogItemsCombiner(collection.collections, catalogCollectionUrl) : <Loader />
            */}
          </CatalogSection>
      </BaseCatalogContainer>
    );
  }
}

const mapStateToProps = state => {
  const { catalog } = state;
  const { 
    shown,
    isRequesting
  } = catalog;

  return {
    shown,
    COLLECTION: catalog.COLLECTION,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(CategoryContainer));