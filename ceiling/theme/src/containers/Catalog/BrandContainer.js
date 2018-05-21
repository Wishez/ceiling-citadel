import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {CATALOG, BRAND} from '@/constants/catalog';
import {transformName, fixUrl} from '@/constants/pureFunctions';
import {catalogSectionCombiner, catalogSubsectionsCombiner} from '@/constants/filter';

import {fetchCatalogEntityOrGetLocale, setLastShownView} from '@/actions/catalog';

import BaseCatalogContainer from './BaseCatalogContainer';

import CatalogSection from '@/components/Catalog/CatalogSection';
import Loader from '@/components/Loader';


class BrandContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    BRAND: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }
  state = {
    id: '',
    brandName: '',
    slogan: '',
    brand:  false,
    sampleUrl: ''
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    const {brandName} = this.state;
    const lastShownView  = {
      name: brandName,
      type: BRAND
    };

    dispatch(setLastShownView(lastShownView));
  }





  requestBrand = (force=false) => {
    const {id, brandName} = this.state;
    const {dispatch} = this.props;

    if (id) {
      const request = dispatch(
        fetchCatalogEntityOrGetLocale(BRAND, id, force)
      );

      if (request) {
        request.then(brand => {
          this.renderNewBrand({
            oldBrandName: brandName,
            brand
          });

        });
      }
    }
  }

  renderNewBrand = ({
    brand,
    oldBrandName
  }) => {
    if (brand) {
      const transformedName = transformName(brand.name);

      if (transformedName !== oldBrandName) {
        this.setState({
          brandName: transformedName,
          slogan: brand.slogan,
          brand
        });
      }
    }
  }

  componentWillMount() {
    this.getIdFromCatalog();
    this.combineSampleUrl();
  }

  getIdFromCatalog = (callback=false, newSlug=false) => {
    const {match} = this.props;
    let {brandSlug} = match.params;
    brandSlug = newSlug ? newSlug : brandSlug;

    localforage.getItem(CATALOG, (error, catalog) => {

      this.setBrandIdAndMakeCallbackIfNeeded({
        catalog,
        brandSlug,
        callback
      });
    });
  }

  combineSampleUrl = () => {
    const {url: categoryUrl} = this.props.match;
    const fixedCategoryUrl = fixUrl(categoryUrl);
    const sampleUrl = fixedCategoryUrl + 'sample/';

    this.setState({sampleUrl});
  }

  setBrandIdAndMakeCallbackIfNeeded = ({
    catalog,
    brandSlug,
    callback
  }) => {
    if (catalog !== null && brandSlug in catalog.brands) {
      const id = catalog.brands[brandSlug].uuid;

      this.setState({id});
      if (callback) {
        callback();
      }
    }
  }

  componentWillUpdate(nextProps) {
    const {
      brandSlug
    } = this.props.match.params;
    const {BRAND} = this.props;

    if (BRAND !== nextProps.BRAND) {
      this.setState({
        brand: false
      });
    }

    const newRoute = nextProps.match.params.brandSlug;

    if (newRoute !== brandSlug) {
      this.getIdFromCatalog(
        this.makeForceRequestForBrand,
        newRoute
      );
      this.combineSampleUrl();
    }
  }

  makeForceRequestForBrand = () => {
    const isForceRequest = true;

    this.requestBrand(isForceRequest);
  }

  render() {
    const {
      isRequesting,
      match
    } = this.props;
    const {url} = match;

    const {
      brand,
      slogan,
      brandName,
      sampleUrl
    } = this.state;
    let collectionsLength, samplesLength;

    if (!brand) {
      this.requestBrand();
    } else {
      collectionsLength = brand.collections.length;
      samplesLength = brand.products.length;
    }

    return (

      <BaseCatalogContainer name={brandName}
        slogan={slogan}
        routes={{
          '/catalog': 'Каталог',
          '/catalog/brand': false,
          '/catalog/brand/:brandSlug': false,
          '/catalog/brand/:brandSlug/': false
        }}
        CONSTANT={BRAND}
      >
        <CatalogSection
          name="Коллекции"
          headerId="collections"
          fallback={
            !isRequesting &&
              !collectionsLength ? <p className="paragraph_container">Нет отельных коллекций.</p> : ''
          }>
          {!isRequesting &&
            collectionsLength ?
            catalogSubsectionsCombiner(brand.collections, url, 'category') : ''
          }
        </CatalogSection>
        <CatalogSection
          name="Образцы"
          headerId="samples"
          fallback={
            !isRequesting &&
              !samplesLength ? <p className="paragraph_container">Нет отельных образцов.</p> : ''
          }>
          {!isRequesting &&
            samplesLength ?
            catalogSubsectionsCombiner(brand.products, sampleUrl, 'section') : ''
          }
        </CatalogSection>
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
    BRAND: catalog.BRAND,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(BrandContainer));
