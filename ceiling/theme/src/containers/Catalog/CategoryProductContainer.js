import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import getClass from './../../constants/classes';
import catalogStore, {
  CATALOG, 
  PRODUCT, 
  LAST_ALBUM
} from './../../constants/catalog';
import { 
  transformName
} from './../../constants/pureFunctions';
import Loader from './../../components/Loader';

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
import Slider from './../../components/Slider/Slider';

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
    collectionName: '',
    product: false,
    slogan: '',
    productName: '',
    album: false,
    slides: []
  }

  requestProduct = () => {
    const {id} = this.state;
    const {dispatch} = this.props;
    // fetchCatalogEntityOrGetLocale can return false.  

    if (id) {

      const request = dispatch(
        fetchCatalogEntityOrGetLocale(PRODUCT, id)
      );

      // Check Promise. It can be empty, because  
      // there is a condition for requesting the
      // local entity in 'fetchCatalogEntityOrGetLocale()'( •̀ω•́ )σ
      if (request) {
          
        
        request.then(product => {
          if (product) {
            // I and product need an album.
            catalogStore.getItem(LAST_ALBUM)
              .then(album => {
                const slides = album.images.map(
                  (image, index) => ({
                    content: <Figure {...image} key={`${index}${index + 1001}`} url={image.image} name="productSlide" />,
                    preview: <Figure {...image} key={`${index}${index + 1002}`} url={image.image} name="productSlidePreview" />
                  })
                );

                // After receiving, we can show it updating the view.
                this.setState({
                  productName: transformName(product.name),
                  slogan: product.slogan,
                  product,
                  album,
                  slides
                });
              });
          }
        });
      }
    }
  } 

  componentDidMount() {
    
    const {dispatch, match} = this.props;
    const {
      categorySlug,
      collectionSlug, 
      productSlug
    } = match.params;

    catalogStore.getItem(CATALOG, (error, catalog) => {
    
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
    });
  }

  render() {        
    const {
      dispatch,
      isRequesting
    } = this.props;

    const {
      id, 
      collectionName,
      categoryName,
      product,
      slogan,
      album,
      productName,
      slides
    } = this.state;

    const {url} = this.props.match;


    if (!product) {
      // fetchCatalogEntityOrGetLocale can return false.
      this.requestProduct();
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
          <div className="productContainer fullWidth lowCascadingShadow">
            <AddProductFormContainer 
              image={product.preview.image}
              {...product}
              url={url}
            /> 
            {product.visualisation !== null ? 
              <Figure url={product.visualisation.image} name='visualisation' maxWidth="100%" /> : 
              ''}
            {(album && album.slug === product.album) ? 
              <Slider slides={slides}
                animSettings={{animDuration: 500, animElasticity: 200}}
                dotSettings={{size: 12, gap: 6}} />
              : ''}
            {product.content ? 
              <section className={getClass({b: 'productContent', add:'parent column centered'})}>{ReactHtmlParser(product.content)}</section> : ''}
          </div>
          : 
          <Loader />}
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
