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
import AddProductFormContainer from './../AddProductFormContainer';
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
    brandName: '',
    collectionName: '',
  }

  componentDidMount() {
    
    const {dispatch, match} = this.props;
    const {
        brandSlug,
        collectionSlug, 
        productSlug
    } = match.params;

    const catalog = localData.get(CATALOG);
    
    if (catalog !== null && brandSlug in catalog.brands) {
        const category = catalog.brands[brandSlug];
        const productData = getProductData(
          category.collections, 
          collectionSlug, 
          productSlug
        );

        this.setState({
          brandName: category.name,
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
      brandName
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

    console.log(product)
    return (
      
      <BaseCatalogContainer name={productName}
            slogan={slogan}
            modifier="product"
            routes={{
              '/catalog': 'Каталог',
              '/catalog/brand': false,
              '/catalog/brand/:brandSlug': brandName,
              '/catalog/brand/:brandSlug/:collectionSlug': collectionName,
              '/catalog/brand/:brandSlug/:collectionSlug/:productSlug/': false
            }}
            isProduct={true}
            CONSTANT={PRODUCT}
      >
          {product ? 
            <AddProductFormContainer 
              image={product.preview.image}
              {...product}
            /> : <Loader />}
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