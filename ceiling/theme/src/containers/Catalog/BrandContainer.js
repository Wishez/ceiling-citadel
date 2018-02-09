import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'



import {CATALOG, BRAND} from './../../constants/catalog';
import getClass from './../../constants/classes';
import {localData, transformName} from './../../constants/pureFunctions';
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
    id: ''
  }

  componentDidMount() {   
    const {dispatch, match} = this.props;
    const {brandSlug} = match.params;
    const catalog = localData.get(CATALOG);
    
    if (catalog !== null && brandSlug in catalog.brands) {
        const id = catalog.brands[brandSlug].uuid;
        this.setState({id});
    }
    
  }

  render() {      
    const {
      dispatch,
      isRequesting
    } = this.props;
    const {url} = this.props.match;
    const {id} = this.state;

    let brand = false,
        slogan = '',
        brandName = '';
    
    if (id) {
      // fetchCatalogEntityOrGetLocale can return false.
      brand = dispatch(fetchCatalogEntityOrGetLocale(BRAND, id));
    }  

    if (brand) {
        brandName = transformName(brand.name);
        slogan = brand.slogan;
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
              catalogSectionCombiner(brand.collections, url) : <Loader />
            }
          </CatalogSection>
      </BaseCatalogContainer>
    );
  }
}

const mapStateToProps = state => {
  const { catalog } = state;
  const { 
    shown,
    isRequesting
  } = catalog;

  return {
    shown,
    BRAND: catalog.BRNAD,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(BrandContainer));