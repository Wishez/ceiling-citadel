import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getClass from './../../constants/classes';
import catalogStore, {CATALOG, COLLECTION, BRAND} from './../../constants/catalog';
import {transformName} from './../../constants/pureFunctions';
import {catalogSectionCombiner, findUUID} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BaseCatalogContainer from './BaseCatalogContainer';

import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
import Loader from './../../components/Loader';

class BrandCollectionContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    COLLECTION: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: '',
    brandName: '',
    collection: false,
    slogan: '',
    collectionName: ''
  }

   requestCollection = () => {
     const {id} = this.state;
     const {dispatch} = this.props;
     // fetchCatalogEntityOrGetLocale can return false.  
     const {url} = this.props.match;
     if (id) {

       const request = dispatch(
         fetchCatalogEntityOrGetLocale(COLLECTION, id)
       );

       // Check Promise. It can be empty, because  
       // there is a condition for requesting the
       // local entity in 'fetchCatalogEntityOrGetLocale()'( •̀ω•́ )σ
       if (request) {
         request.then(requestedCollection => {
           if (requestedCollection) {
             this.setState({
               collectionName: transformName(requestedCollection.name),
               slogan: requestedCollection.slogan,
               collection: requestedCollection,
             });
           }
         });
       }
     }
   } 

   componentDidMount() {
    
     const {match} = this.props;
     const {collectionSlug, brandSlug} = match.params;
    

     catalogStore.getItem(CATALOG, (error, catalog) => {
       if (catalog !== null && brandSlug in catalog.brands) {
         const brand = catalog.brands[brandSlug];
         const id = findUUID(brand.collections, collectionSlug);
          
         this.setState({
           brandName: brand.name,
           id
         });
       }
     });
    
   }

   render() {        
     const {
       isRequesting
     } = this.props;

     const {url} = this.props.match;

     const {
       id, 
       brandName,
       collection,
       collectionName,
       slogan
     } = this.state;

     if (!collection) {
       // fetchCatalogEntityOrGetLocale can return false.
       this.requestCollection();
     }     

     return (
       <BaseCatalogContainer name={collectionName}
         slogan={slogan}
         routes={{
           '/catalog': 'Каталог',
           '/catalog/brand': false,
           '/catalog/brand/:brandSlug': brandName,
           '/catalog/brand/:brandSlug/:collectionSlug': collectionName
         }}
         CONSTANT={COLLECTION}
       >
         <CatalogSection name="Образцы" headerId="samples">
           {!isRequesting && 
            collection ?
             catalogSectionCombiner(collection.collection_items, url, true) : ''
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
    COLLECTION: catalog.COLLECTION,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(BrandCollectionContainer));
