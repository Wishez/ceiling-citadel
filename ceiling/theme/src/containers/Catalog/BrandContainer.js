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
  
  requestBrand = () => {
    const {id} = this.state;
    const {dispatch} = this.props;
    // fetchCatalogEntityOrGetLocale can return false.  

    if (id) {

      const request = dispatch(
        fetchCatalogEntityOrGetLocale(BRAND, id)
      );

      // Check Promise. It can be empty, because  
      // there is a condition for requesting the
      // local entity in 'fetchCatalogEntityOrGetLocale()'( •̀ω•́ )σ
      if (request) {
        request.then(requestedBrand => {
          if (requestedBrand) {
            this.setState({
              brandName: transformName(requestedBrand.name),
              slogan: requestedBrand.slogan,
              brand: requestedBrand,
            });
          }

        });
      }
    }
  } 

  componentDidMount() {   
    const {match} = this.props;
    const {brandSlug} = match.params;
    // Get catalog
    catalogStore.getItem(CATALOG, (error, catalog) => {
      // Check for existance.
      if (catalog !== null && brandSlug in catalog.brands) {
        const id = catalog.brands[brandSlug].uuid;
        // I need it for updating component, Then, 
        // in view will be request for the current entity,
        // if the user have already not seen it.
        this.setState({id});
      }
    });
    
  }

  state = {
    id: '',
    brandName: '',
    slogan: '',
    brand:  false
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
    BRAND: catalog.BRNAD,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(BrandContainer));
