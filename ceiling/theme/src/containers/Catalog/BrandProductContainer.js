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
} from '@/constants/catalog';

import {transformName, makeSlides} from '@/constants/pureFunctions';

import {getProductData} from '@/constants/filter';


import BaseCatalogContainer from './BaseCatalogContainer';
import AddProductFormContainer from './../AddProductFormContainer';

import {fetchCatalogEntityOrGetLocale} from '@/actions/catalog';
import {resetAddToCartForm} from '@/actions/cart';

import Figure from '@/components/Figure';
import Loader from '@/components/Loader';

import Slider from '@/components/Slider/Slider';

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
    collectionName: '',
    product: false,
    slogan: '',
    productName: '',
    album: false,
    slides: [],
    inited: true
  }

  getIdFromCatalog = (callback=false) => {
    const {dispatch, match} = this.props;

    const {
      brandSlug,
      collectionSlug,
      productSlug
    } = match.params;

    localforage.getItem(CATALOG, (error, catalog) => {
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

        if (callback) {
          callback();
        }
      }
    });
  }

   requestProduct = (force=false) => {
     const {id, productName} = this.state;
     const {dispatch} = this.props;

     if (id) {
       const request = dispatch(
         fetchCatalogEntityOrGetLocale(PRODUCT, id, force)
       );

       if (request) {
         request.then(product => {

           if (product) {
             localforage.getItem(LAST_ALBUM)
               .then(album => {
                 const slides = album.images.map(makeSlides);
                 const transformedProductName =  transformName(product.name);

                 if (productName !== transformedProductName) {
                   this.setState({
                     productName: transformedProductName,
                     slogan: product.slogan,
                     product,
                     album,
                     slides,
                     inited: true
                   });
                 }

               });
           }
         });
       }
     }
   }

   componentWillUpdate(nextProps) {
     const {productSlug} = this.props.match.params;
     const {PRODUCT, dispatch} = this.props;


     if (PRODUCT !== nextProps.PRODUCT) {
       this.setState({
         product: false
       });

       dispatch(resetAddToCartForm());
     }

     if (nextProps.match.params.productSlug !== productSlug) {
       this.getIdFromCatalog(this.makeForcerequestForProduct);
     }
   }

   makeForcerequestForProduct = () => {
     const isForceRequest = true;

     this.requestProduct(isForceRequest);
   }

   componentWillMount() {
     this.showAddToCartForm();

     this.getIdFromCatalog();
   }

   showAddToCartForm = () => {
     const {dispatch} = this.props;

     dispatch(resetAddToCartForm());
   }


   render() {
     const {
       isRequesting
     } = this.props;
     const {url} = this.props.match;
     const {
       collectionName,
       brandName,
       product,
       slogan,
       album,
       productName,
       slides
     } = this.state;

     if (!product) {
       this.requestProduct();
     }

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
         {!isRequesting && product ?
           <div className="productContainer fullWidth lowCascadingShadow">
             <AddProductFormContainer
               image={product.preview.image}
               {...product}
               url={url}
             />

             {product.visualisation !== null ?
               <Figure
                 url={product.visualisation.image}
                 name="visualisation"
                 maxWidth="100%"
               />
               : ''
             }

             {album && album.slug === product.album ?
               <Slider
                 slides={slides}
                 animSettings={{ animDuration: 500, animElasticity: 200 }}
                 dotSettings={{ size: 12, gap: 6 }}
               />
               : ''}

             {product.content ?
               <section className='productContent parent centered'>
                 <div className="productDescriptionContainer parent column">
                   {ReactHtmlParser(product.content)}
                 </div>
               </section>
               : ''}
           </div>
           : <Loader />}
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
