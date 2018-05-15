import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {CATALOG, BRAND} from '@/constants/catalog';
import getClass from '@/constants/classes';
import {transformName} from './../../constants/pureFunctions';
import {catalogSectionCombiner, catalogSubsectionsCombiner} from '@/constants/filter';

import BaseCatalogContainer from './BaseCatalogContainer';
import {fetchCatalogEntityOrGetLocale} from '@/actions/catalog';

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
    brand:  false
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
        () => { this.requestBrand(true); },
        newRoute
      );
    }
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
          this.renderNewBrand();
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

  componentDidMount() {
    this.getIdFromCatalog();
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


  render() {
    const {
      isRequesting
    } = this.props;
    const {url} = this.props.match;
    const {
      id,
      brand,
      slogan,
      brandName
    } = this.state;

    if (!brand) {
      this.requestBrand();
    }

    return (

      <BaseCatalogContainer name={brandName}
        slogan={slogan}
        routes={{
          '/catalog': 'Каталог',
          '/catalog/brand': false,
          '/catalog/brand/:brandSlug': false
        }}
        CONSTANT={BRAND}
      >
        <CatalogSection name="Коллекции" headerId="collections">
          {!isRequesting &&
            brand ?
            catalogSectionCombiner(brand.collections, url) : ''
          }
        </CatalogSection>
        <CatalogSection name="Категории" headerId="categories">
          {!isRequesting &&
            brand ?
            catalogSubsectionsCombiner(brand.categories, '/catalog/category', 'brand') : ''
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
