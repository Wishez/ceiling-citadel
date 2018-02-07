import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import getClass from './../../constants/classes';
import {CATALOG, COLLECTION} from './../../constants/catalog';
import {localData, getArray} from './../../constants/pureFunctions';
import {catalogItemsCombiner} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BreadcrumbsContainer from './../BreadcrumbsContainer';
import BaseCatalogContainer from './BaseCatalogContainer';
import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
import Loader from './../../components/Loader';

class CategoryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    COLLECTION: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: ''
  }

  componentDidMount() {
    
    const {dispatch, match} = this.props;
    const {collectionSlug} = match.params;
    const catalog = localData.get(CATALOG);
    
    if (catalog !== null && collectionSlug in catalog.categories) {
        console.log(catalog, collectionSlug, 'collectionSlug');
        
        const id = catalog.categories[collectionSlug].uuid;
        
        this.setState({id});
    }
    
  }

  componentWillReceiveProps(nextProps) {
    
    // console.log('will check nextProps', this.props.COLLECTION, nextProps.COLLECTION)
    // Will be accuracy. 
    // There is COLLECTION constant in catalog's constants.
    if (!this.props.COLLECTION && nextProps.COLLECTION) {
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

    let collection = false,
        slogan = '',
        collectionName = ''
    if (id) {
      // fetchCatalogEntityOrGetLocale can return false.
      collection = dispatch(fetchCatalogEntityOrGetLocale(COLLECTION, id));
    } 

    if (collection) {
        collectionName =collection.name; 
        collectionName = `${collectionName.charAt(0).toUpperCase()}${collectionName.slice(1)}`;
        slogan = collection.slogan;
    }
    
    return (
      
          <BaseCatalogContainer name={collectionName}
                slogan={slogan}
                routes={{
                  '/catalog': 'Каталог',
                  '/catalog/collection': false,
                  '/catalog/category/:collectionSlug': collectionName,
                  '/catalog/collection/:collectionSlug': collectionName
                }}
                CONSTANT={COLLECTION}
          >
            <CatalogSection name="Коллекции" headerId="collections">
              {!isRequesting && 
              collection ?
                catalogItemsCombiner(collection.collections, catalogCollectionUrl) : <Loader />
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
    COLLECTION: catalog.COLLECTION,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(CategoryContainer));