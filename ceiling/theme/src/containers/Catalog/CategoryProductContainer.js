import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import * as localforage from 'localforage'

import {
  CATALOG,
  PRODUCT,
  LAST_ALBUM,
} from "@/constants/catalog";
import {
  transformName,
  makeSlides,
} from "@/constants/pureFunctions";

import {
  getProductData,
} from "@/constants/filter";

import { fetchCatalogEntityOrGetLocale } from "@/actions/catalog";
import { resetAddToCartForm } from "@/actions/cart";

import Figure from "@/components/Figure";
import Loader from "@/components/Loader";
import Slider from "@/components/Slider/Slider";
import AddProductFormContainer from "./../AddProductFormContainer";
import BaseCatalogContainer from "./BaseCatalogContainer";
import BreadcrumbsContainer from "./../BreadcrumbsContainer";

class CategoryProductContainer extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    PRODUCT: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,
  }


  state = {
    id: "",
    categoryName: "",
    collectionName: "",
    product: false,
    slogan: "",
    productName: "",
    album: false,
    slides: [],
  }

  componentDidMount() {
    this.showAddToCartForm();
    this.getIdFromCatalog();
  }

  showAddToCartForm = () => {
    const { dispatch } = this.props;

    dispatch(resetAddToCartForm());
  }

  getIdFromCatalog = (callback = false) => {
    const { match } = this.props;

    const {
      categorySlug,
      collectionSlug,
      productSlug,
    } = match.params;

    localforage.getItem(CATALOG, (error, catalog) => {
      this.findAndSaveProductData({
        categorySlug,
        collectionSlug,
        productSlug,
        catalog,
        callback,
      });
    });
  }

  findAndSaveProductData = ({
    catalog,
    categorySlug,
    callback,
    collectionSlug,
    productSlug,
  }) => {
    if (catalog !== null && categorySlug in catalog.categories) {
      const category = catalog.categories[categorySlug];

      const productData = getProductData(
        category.collections,
        collectionSlug,
        productSlug
      );

      this.setState({
        categoryName: category.name,
        ...productData,
      });

      if (callback) {
        callback();
      }
    }
  }

  transformAndRenderProductIfNeeded = ({
    product,
    oldProductName,
  }) => {
    if (product) {
      localforage.getItem(LAST_ALBUM)
        .then((album) => {
          const slides = album.images.map(makeSlides);
          const transformedProductName =  transformName(product.name);

          if (oldProductName !== transformedProductName) {
            this.setState({
              productName: transformedProductName,
              slogan: product.slogan,
              product,
              album,
              slides,
            });
          }
        });
    }
  }

  componentWillUpdate(nextProps) {
    const {
      productSlug,
    } = this.props.match.params;
    const { PRODUCT } = this.props;

    const isProductUpdated = PRODUCT !== nextProps.PRODUCT;

    if (isProductUpdated) {
      this.cleanCurrentProduct();
      this.showAddToCartForm();
    }

    const newProuctSlug = nextProps.match.params.productSlug;

    if (newProuctSlug !== productSlug) {
      this.getIdFromCatalog(this.makeForceRequestProductAfterFindingId);
    }
  }

  cleanCurrentProduct = () => {
    this.setState({
      product: false,
    });
  }


  makeForceRequestProductAfterFindingId = () => {
    const isForceRequest = true;

    this.requestProduct(isForceRequest);
  }

  requestProduct = (force = false) => {
    const { id, productName } = this.state;
    const { dispatch } = this.props;

    if (id) {
      const request = dispatch(
        fetchCatalogEntityOrGetLocale(PRODUCT, id, force)
      );

      if (request) {
        request.then((product) => {
          this.transformAndRenderProductIfNeeded({
            oldProductName: productName,
            product,
          });
        });
      }
    }
  }

  render() {
    const {
      collectionName,
      categoryName,
      product,
      slogan,
      album,
      productName,
      slides,
    } = this.state;
    const { url } = this.props.match;

    if (!product) {
      this.requestProduct();
    }

    return (
      <BaseCatalogContainer
        name={productName}
        slogan={slogan}
        modifier="product"
        routes={{
          "/catalog": "Каталог",
          "/catalog/category": false,
          "/catalog/category/:categorySlug": categoryName,
          "/catalog/category/:categorySlug/:collectionSlug": collectionName,
          "/catalog/category/:categorySlug/:collectionSlug/:productSlug": false,
          "/catalog/category/:categorySlug/:collectionSlug/:productSlug/": false,
        }}
        isProduct
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
              <Figure url={product.visualisation.image} name="visualisation" maxWidth="100%" />
              : ""}

            {(album && album.slug === product.album) ?
              <Slider
                slides={slides}
                animSettings={{ animDuration: 500, animElasticity: 200 }}
                dotSettings={{ size: 12, gap: 6 }}
              />
              : ""}

            {product.content ?
              <section className="productContent parent centered">
                <div className="productDescriptionContainer parent column">
                  {ReactHtmlParser(product.content)}
                </div>
              </section>
              : ""}
          </div>
          : <Loader />}
      </BaseCatalogContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { catalog } = state;
  const {
    isRequesting,
  } = catalog;

  return {
    PRODUCT: catalog.PRODUCT,
    isRequesting,
  };
};

export default withRouter(connect(mapStateToProps)(CategoryProductContainer));
