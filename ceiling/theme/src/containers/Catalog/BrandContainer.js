import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import catalogStore, {CATALOG, BRAND} from './../../constants/catalog';
import getClass from './../../constants/classes';
import {transformName} from './../../constants/pureFunctions';
import {catalogSectionCombiner} from './../../constants/filter';

import BaseCatalogContainer from './BaseCatalogContainer';
import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
import Loader from './../../components/Loader';

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

  requestBrand = (force=false) => {
    const {id, brandName} = this.state;
    const {dispatch} = this.props;
    // fetchCatalogEntityOrGetLocale can return false.  
    if (id) {

      const request = dispatch(
        fetchCatalogEntityOrGetLocale(BRAND, id, force)
      );

      // Check Promise. It can be empty, because  
      // there is a condition for requesting the
      // local entity in 'fetchCatalogEntityOrGetLocale()'( •̀ω•́ )σ
      
      if (request) {
        request.then(brand => {
          if (brand) {
            const transformedName = transformName(brand.name);
          
            if (transformedName !== brandName) {
              this.setState({
                brandName: transformedName,
                slogan: brand.slogan,
                brand
              });
            }
          }
        });
      }
    }
  } 
  componentWillUpdate(nextProps, nextState) {
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

  getIdFromCatalog = (callback=false, newSlug=false) => {
    const {match} = this.props;
    let {brandSlug} = match.params;
    brandSlug = newSlug ? newSlug : brandSlug;
    
    // Get catalog
    catalogStore.getItem(CATALOG, (error, catalog) => {
      // Check for existance.
      if (catalog !== null && brandSlug in catalog.brands) {
        const id = catalog.brands[brandSlug].uuid;
        // I need it for updating component, Then, 
        // in view will be request for the current entity,
        // if the user have already not seen it.
        this.setState({id});

        if (callback) {
          callback();
        }
      }
    });
  }

  componentDidMount() {   
    this.getIdFromCatalog();
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
          '/catalog/brand/:brandSlug': brandName,
        }}
        CONSTANT={BRAND}
      >
        <CatalogSection name="Коллекции" headerId="collections">
          {!isRequesting && 
            brand ?
            catalogSectionCombiner(brand.collections, url) : ''
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
