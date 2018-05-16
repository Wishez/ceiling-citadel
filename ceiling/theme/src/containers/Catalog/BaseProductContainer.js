import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import getClass from '@/constants/classes';
import {
  CATALOG,
  PRODUCT,
  LAST_ALBUM,
  PRODUCT_SLUG,
  BRAND,
  CATEGORY
} from '@/constants/catalog';
import { transformName, makeSlides } from '@/constants/pureFunctions';
import { getProductData } from '@/constants/filter';

import BaseCatalogContainer from './BaseCatalogContainer';
import AddProductFormContainer from './../AddProductFormContainer';

import { fetchCatalogEntityOrGetLocale } from '@/actions/catalog';
import { resetAddToCartForm } from '@/actions/cart';

import Figure from '@/components/Figure';
import Loader from '@/components/Loader';
import Slider from '@/components/Slider/Slider';

class BaseProductContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    PRODUCT: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,
    productBreadcrumbsType: PropTypes.string.isRequired,
    lastShownView: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      product: false,
      slogan: '',
      productName: '',
      album: false,
      slides: [],
      inited: true
    };
  }

  componentWillUpdate(nextProps) {
    const { productSlug } = this.props.match.params;
    const { PRODUCT, dispatch } = this.props;

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
  };

  componentDidMount() {
    this.showAddToCartForm();
    this.makeAndSaveBreadcrumbsRoutes();
  }

  showAddToCartForm = () => {
    const { dispatch } = this.props;

    dispatch(resetAddToCartForm());
  };

  makeAndSaveBreadcrumbsRoutes = () => {
    const {lastShownView} = this.props;
    const lastStepName = lastShownView.name;
    let breadcrumbsRoutes = {};

    switch(lastShownView.type) {
      case CATEGORY:
        breadcrumbsRoutes = {
          '/catalog': 'Каталог',
          '/catalog/category': false,
          '/catalog/category/:categorySlug': lastStepName,
          '/catalog/category/:categorySlug/sample/': false,
          '/catalog/category/:categorySlug/sample/:productSlug/': false
        };
        break;
      case BRAND:
        breadcrumbsRoutes = {
          '/catalog': 'Каталог',
          '/catalog/brand': false,
          '/catalog/brand/:brandSlug': lastStepName,
          '/catalog/brand/:brandSlug/sample/': false,
          '/catalog/brand/:brandSlug/sample/:productSlug/': false
        };
        break;
      default:
    }


    this.setState({
      breadcrumbsRoutes
    });
  }

  requestProduct = (force = false) => {
    const { productName } = this.state;
    const { dispatch } = this.props;
    const { productSlug } = this.props.match.params;

    if (productSlug) {
      const request = dispatch(
        fetchCatalogEntityOrGetLocale(PRODUCT_SLUG, productSlug, force)
      );

      if (request) {
        request.then(product => {
          if (product) {
            localforage.getItem(LAST_ALBUM).then(album => {
              const slides = album.images.map(makeSlides);
              const transformedProductName = transformName(product.name);

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
  };



  render() {
    const { breadcrumbsRoutes, isRequesting, match } = this.props;

    const { url } = match;

    const { product, slogan, album, slides, productName } = this.state;

    if (!product) {
      this.requestProduct();
    }

    return (
      <BaseCatalogContainer
        name={productName}
        slogan={slogan}
        modifier="product"
        routes={breadcrumbsRoutes}
        isProduct={true}
        CONSTANT={PRODUCT}
      >
        {!isRequesting && product ? (
          <div className="productContainer fullWidth lowCascadingShadow">
            <AddProductFormContainer
              image={product.preview.image}
              {...product}
              url={url}
            />
            {product.visualisation !== null ? (
              <Figure
                url={product.visualisation.image}
                name="visualisation"
                maxWidth="100%"
              />
            ) : (
              ''
            )}
            {album && album.slug === product.album ? (
              <Slider
                slides={slides}
                animSettings={{ animDuration: 500, animElasticity: 200 }}
                dotSettings={{ size: 12, gap: 6 }}
              />
            ) : (
              ''
            )}
            {product.content ? (
              <section
                className={getClass({
                  b: 'productContent',
                  add: 'parent column centered'
                })}
              >
                {ReactHtmlParser(product.content)}
              </section>
            ) : (
              ''
            )}
          </div>
        ) : (
          <Loader />
        )}
      </BaseCatalogContainer>
    );
  }
}

const mapStateToProps = state => {
  const { catalog } = state;

  const { isRequesting, lastShownView } = catalog;

  return {
    PRODUCT: catalog.PRODUCT,
    isRequesting,
    lastShownView
  };
};

export default withRouter(connect(mapStateToProps)(BaseProductContainer));
