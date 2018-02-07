import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'



import {CATALOG, BRAND} from './../../constants/catalog';
import getClass from './../../constants/classes';
import {localData, getArray} from './../../constants/pureFunctions';
import {catalogItemsCombiner} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BreadcrumbsContainer from './../BreadcrumbsContainer';

import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
import Loader from './../../components/Loader';

class BrandContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    BRAND: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }
  state = {
    id: ''
  }
  componentDidMount() {
    
    const {dispatch, match} = this.props;
    const {brandSlug} = match.params;
    const catalog = localData.get(CATALOG);
    console.log(catalog)
    if (catalog !== null && brandSlug in catalog.brands) {
        console.log(catalog, brandSlug, 'brandSLug')
        
        const id = catalog.brands[brandSlug].uuid;
        // dispatch
        this.setState({id});
    }
    
  }

  componentWillReceiveProps(nextProps) {
    
    // console.log('will check nextProps', this.props.BRAND, nextProps.BRAND)
    // Will be accuracy. 
    // There is BRAND constant in catalog's constants.
    if (!this.props.BRAND && nextProps.BRAND) {
      // console.log('will force update')
      this.forceUpdate();
    }
  }

  render() {      
    const {
      dispatch,
      isRequesting
    } = this.props;
    const {id} = this.state;
    let brand = false;
    if (id) {
      // fetchCatalogEntityOrGetLocale can return false.
      brand = dispatch(fetchCatalogEntityOrGetLocale(BRAND, id));
    }  
    let brandName = brand ? brand.name : '';
    brandName = `${brandName.charAt(0).toUpperCase()}${brandName.slice(1)}`;
    
    return (
      <div className={getClass({b: 'brand', add:'container'})}>
          <div className={getClass({b: 'catalogHeader', add: "parent row v-start h-centered"})}> 
            <h1 className={getClass({b: 'catalogHeader', el: "title", add: "parent row centered baseChild"})}>
              {brand.name}
            </h1>
            <BreadcrumbsContainer routes={{
              '/catalog': 'Каталог',
              '/catalog/brand': false,
              '/catalog/brand/:brandSlug': brandName
            }} />
            <p className={getClass({b: 'catalogHeader', el: "slogan", add: "darkBlue parent row h-end baseChild"})}>
                {brand.slogan}
            </p>
          </div>
          <CatalogSection name="Коллекции" headerId="collections">
            {!isRequesting && 
            brand ?
              catalogItemsCombiner(brand.collections, catalogCollectionUrl) : <Loader />
            }
          </CatalogSection>
      </div>
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