import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import getClass from './../../constants/classes';
import {
  CATALOG, 
  PRODUCT, 
  LAST_ALBUM
} from './../../constants/catalog';
import {
  localData, 
  transformName
} from './../../constants/pureFunctions';

import { 
  getProductData, 
  findUUID
} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BreadcrumbsContainer from './../BreadcrumbsContainer';
import BaseCatalogContainer from './BaseCatalogContainer';
import AddProductFormContainer from './../AddProductFormContainer';
import {
  fetchCatalogEntityOrGetLocale
} from './../../actions/catalog';

import Figure from './../../components/Figure';
import CatalogSection from './../../components/Catalog/CatalogSection';
// import Loader from './../../components/Loader';
import ImagesCarousel from './../../components/ImagesCarousel';

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
    
    if (catalog !== null && categorySlug in catalog.categories) {
      const category = catalog.categories[categorySlug];
      const productData = getProductData(
        category.collections, 
        collectionSlug, 
        productSlug
      );


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

    const {url} = this.props.match;

    let product = false,
      slogan = '',
      productName = '',
      album = false;

    if (id) {
      // fetchCatalogEntityOrGetLocale can return false.
      product = dispatch(fetchCatalogEntityOrGetLocale(PRODUCT, id));
    } 

    if (product) {
      productName = transformName(product.name); 
      slogan = product.slogan;
      album = localData.get(LAST_ALBUM);
    }

    return (
      
      <BaseCatalogContainer name={productName}
        slogan={slogan}
        modifier="product"
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
        {product ? 
          <div style={{width: '100%'}}>
            <AddProductFormContainer 
              image={product.preview.image}
              {...product}
              url={url}
            /> 
            {product.visualisation !== null ? 
              <Figure url={product.visualisation.image} name='visualisation' maxWidth="100%" /> : 
              ''}
            {(album && album.slug === product.album) ? 
              <ImagesCarousel 
                images={album.images} 
                loop 
                autoplay
                smartSpeed={350}
                items={1}
                dotsEach
                lazyLoad
                autoplayHoverPause
              />: ''}
            {product.content ? 
              <section className={getClass({b: 'productContent'})}>{ReactHtmlParser(product.content)}</section> : ''}
          </div>
          : 
          ''}
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
    PRODUCT: catalog.PRODUCT,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(CategoryProductContainer));
