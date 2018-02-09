import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import getClass from './../../constants/classes';
import {CATALOG, PRODUCT} from './../../constants/catalog';
import {localData, transformName} from './../../constants/pureFunctions';
import { 
  getProductData, 
  findUUID
} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BreadcrumbsContainer from './../BreadcrumbsContainer';
import BaseCatalogContainer from './BaseCatalogContainer';
import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
import Loader from './../../components/Loader';

class CategoryProductContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    PRODUCT: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: '',
    categoryName: '',
    collectionName: ''
  }

  componentDidMount() {
    
    const {dispatch, match} = this.props;
    const {
        categorySlug,
        collectionSlug, 
        productSlug
    } = match.params;

    const catalog = localData.get(CATALOG);
    console.log('Have got catalog', catalog)
    if (catalog !== null && categorySlug in catalog.categories) {
        console.log(
          catalog, 
          categorySlug,
          collectionSlug, 
          productSlug,
          'slugs');
        const category = catalog.categories[categorySlug];
        const productData = getProductData(
          category.collections, 
          collectionSlug, 
          productSlug
        );

        console.log('Will set data.', productData);

        this.setState({
          categoryName: category.name,
          ...productData
        });
    }
    
  }

  render() {        
    const {
      dispatch,
      isRequesting
    } = this.props;

    const {
      id, 
      collectionName,
      categoryName
    } = this.state;

    let product = false,
        slogan = '',
        productName = '';

    if (id) {
      // fetchCatalogEntityOrGetLocale can return false.
      product = dispatch(fetchCatalogEntityOrGetLocale(PRODUCT, id));
    } 

    if (product) {
        productName = transformName(product.name); 
        slogan = product.slogan;
    }
    console.log(slogan)
    return (
      
      <BaseCatalogContainer name={productName}
            slogan={slogan}
            routes={{
              '/catalog': 'Каталог',
              '/catalog/category': false,
              '/catalog/category/:categorySlug': categoryName,
              '/catalog/category/:categorySlug/:collectionSlug': collectionName,
              '/catalog/category/:categorySlug/:collectionSlug/:productSlug/': false
            }}
            isProduct={true}
            CONSTANT={PRODUCT}
      >
            
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
    PRODUCT: catalog.PRODUCT,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(CategoryProductContainer));