import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getClass from './../../constants/classes';
import catalogStore, {CATALOG, CATEGORY} from './../../constants/catalog';
import {transformName} from './../../constants/pureFunctions';
import {catalogSubsectionsCombiner} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BaseCatalogContainer from './BaseCatalogContainer';

import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
// import Loader from './../../components/Loader';

class CategoryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    CATEGORY: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: '',
    category: false,
    categoryName: '',
    slogan: ''
  }

  requestCategory = (force=false) => {
    const {id, categoryName} = this.state;
    const {dispatch} = this.props;

    if (id) {
      const request = dispatch(
        fetchCatalogEntityOrGetLocale(CATEGORY, id, force)
      );
        
      if (request) {
        request.then(category => {
          if (category) {
            const transformedName = transformName(category.name);

            if (transformName !== categoryName) {
              this.setState({
                categoryName: transformedName,
                slogan: category.slogan,
                category: category,
                id
              });
            }
          }
        });
      }
      
    }
  }
  componentWillUpdate(nextProps, nextState) {
    const {
      categorySlug
    } = this.props.match.params;
    const {CATEGORY} = this.props;
    
    if (CATEGORY !== nextProps.CATEGORY) {
      this.setState({
        category: false
      });
    }

    const newRoute = nextProps.match.params.categorySlug;

    if (newRoute !== categorySlug) {
      this.getIdFromCatalog(
        () => { this.requestCategory(true); },
        newRoute  
      );
    }
  }


  getIdFromCatalog = (callback=false, newSlug=false) => {
    const {match} = this.props;
    const {categorySlug} = match.params;

    catalogStore.getItem(CATALOG, (error, catalog) => {


      if (catalog !== null && categorySlug in catalog.categories) {        
        const id = catalog.categories[categorySlug].uuid;
            
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
      category,
      slogan,
      categoryName
    } = this.state;

    if (!category) {
      this.requestCategory();
    }
      
    
    return (
      <BaseCatalogContainer name={categoryName}
        slogan={slogan}
        routes={{
          '/catalog': 'Каталог',
          '/catalog/category': false,
          // '/catalog/category/:categorySlug': categoryName,
        }}
        CONSTANT={CATEGORY}
      >
        <CatalogSection name="Коллекции" headerId="collections">
          {!isRequesting && 
            category ?
            catalogSubsectionsCombiner(category.collections, url, 'brand') : ''
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
    CATEGORY: catalog.CATEGORY,
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(CategoryContainer));
