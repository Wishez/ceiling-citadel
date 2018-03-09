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
import Loader from './../../components/Loader';

// import ImagesCarousel from './../../components/ImagesCarousel';
import Slider from './../../components/Slider/Slider';
// <ImagesCarousel 
//                 images={album.images} 
//                 loop 
//                 autoplay
//                 smartSpeed={350}
//                 items={1}
//                 dotsEach
//                 lazyLoad
//                 autoplayHoverPause
//               />
class BrandProductContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    PRODUCT: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,
  }


  state = {
    id: '',
    brandName: '',
    collectionName: ''
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
    const {url} = this.props.match;

    let product = false,
      slogan = '',
      productName = '',
      album = false,
      slides = [];

    if (id) {
      // fetchCatalogEntityOrGetLocale can return false.
      product = dispatch(fetchCatalogEntityOrGetLocale(PRODUCT, id));
    } 

    if (product) {
      productName = transformName(product.name); 
      slogan = product.slogan;
      album = localData.get(LAST_ALBUM);
      slides = album.images.map(
        (image, index) => ({
          content: <Figure key={`${index}${index + 1001}`} {...image} name="productSlide" />,
          preview: <Figure key={`${index}${index + 1002}`} {...image} name="productSlidePreview" />
        })
      );
    }
    console.log(album, slides);
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
          <div className="fullWidth lowCascadingShadow">
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

export default withRouter(connect(mapStateToProps)(BrandProductContainer));
