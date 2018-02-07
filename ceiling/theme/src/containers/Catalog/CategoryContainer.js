import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import getClass from './../../constants/classes';
import {CATALOG, CATEGORY} from './../../constants/catalog';
import {localData, trasformName} from './../../constants/pureFunctions';
import {catalogItemsCombiner} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BaseCatalogContainer from './BaseCatalogContainer';
import BreadcrumbsContainer from './../BreadcrumbsContainer';

import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
import Loader from './../../components/Loader';

class CategoryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    CATEGORY: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: ''
  }

  componentDidMount() {
    
    const {dispatch, match} = this.props;
    const {categorySlug} = match.params;
    const catalog = localData.get(CATALOG);
    // console.log(catalog);
    if (catalog !== null && categorySlug in catalog.categories) {
        console.log(catalog, categorySlug, 'cateogrySlug');
        
        const id = catalog.categories[categorySlug].uuid;
        
        this.setState({id});
    }
    
  }

  componentWillReceiveProps(nextProps) {
    
    // console.log('will check nextProps', this.props.BRAND, nextProps.BRAND)
    // Will be accuracy. 
    // There is BRAND constant in catalog's constants.
    if (!this.props.CATEGORY && nextProps.CATEGORY) {
      // console.log('will force update')
      this.forceUpdate();
    }
  }

  render() {        
    const {
      dispatch,
      isRequesting,
      categoryRoutes
    } = this.props;

    const {id} = this.state;

    let category = false,
        slogan = '',
        categoryName = '';
    if (id) {
      // fetchCatalogEntityOrGetLocale can return false.
      category = dispatch(fetchCatalogEntityOrGetLocale(CATEGORY, id));
    } 
    
    if (category) {
        categoryName =trasformName(category.name);
        slogan = category.slogan;
    }
    console.log('category', category);
    return (
      <BaseCatalogContainer name={categoryName}
              slogan={slogan}
              routes={{
                '/catalog': 'Каталог',
                '/catalog/category': false,
                '/catalog/category/:categorySlug': categoryName,
              }}
              CONSTANT={CATEGORY}
        >
      {/*<div className={getClass({b: 'category', add:'container'})}>
          <div className={getClass({b: 'catalogHeader', add: "parent row v-start h-centered"})}> 
            <h1 className={getClass({b: 'catalogHeader', el: "title", add: "parent row centered baseChild"})}>
              {categoryName}
            </h1>
            <BreadcrumbsContainer  />
            <p className={getClass({b: 'catalogHeader', el: "slogan", add: "parent row h-end  darkBlue baseChild"})}>
                {slogan}
            </p>
          </div>*/}
          <CatalogSection name="Коллекции" headerId="collections">
            {!isRequesting && 
            category ?
              catalogItemsCombiner(category.collections, catalogCollectionUrl) : <Loader />
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
    isRequesting,
    categoryRoutes
  } = catalog;

  return {
    shown,
    CATEGORY: catalog.CATEGORY,
    isRequesting,
    categoryRoutes
  };
};

export default withRouter(connect(mapStateToProps)(CategoryContainer));