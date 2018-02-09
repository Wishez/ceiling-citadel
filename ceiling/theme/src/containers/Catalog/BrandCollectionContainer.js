import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getClass from './../../constants/classes';
import {CATALOG, COLLECTION, BRAND} from './../../constants/catalog';
import {localData, transformName} from './../../constants/pureFunctions';
import {catalogSectionCombiner, findUUID} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BaseCatalogContainer from './BaseCatalogContainer';

import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
import Loader from './../../components/Loader';

class BrandCollectionContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    COLLECTION: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: '',
    brandName: ''
  }

  componentDidMount() {
    
    const {dispatch, match} = this.props;
    const {collectionSlug, brandSlug} = match.params;
    const catalog = localData.get(CATALOG);
    
    if (catalog !== null && brandSlug in catalog.brands) {
        const brand = catalog.brands[brandSlug];
        const id = findUUID(brand.collections, collectionSlug);
        
        this.setState({
          brandName: brand.name,
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
    const {id, brandName} = this.state;

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
                '/catalog/brand': false,
                '/catalog/brand/:brandSlug': brandName,
                '/catalog/brand/:brandSlug/:collectionSlug': collectionName
              }}
              CONSTANT={COLLECTION}
        >
          <CatalogSection name="Образцы" headerId="samples">
            {!isRequesting && 
            collection ?
              catalogSectionCombiner(collection.collection_items, url, true) : <Loader />
            }
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

export default withRouter(connect(mapStateToProps)(BrandCollectionContainer));