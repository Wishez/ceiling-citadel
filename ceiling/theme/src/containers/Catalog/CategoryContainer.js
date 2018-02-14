import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import getClass from './../../constants/classes';
import {CATALOG, CATEGORY} from './../../constants/catalog';
import {localData, transformName} from './../../constants/pureFunctions';
import {catalogSubsectionsCombiner} from './../../constants/filter';
import {catalogCollectionUrl} from './../../constants/conf';

import BaseCatalogContainer from './BaseCatalogContainer';

import {fetchCatalogEntityOrGetLocale} from './../../actions/catalog';

import CatalogSection from './../../components/Catalog/CatalogSection';
import Loader from './../../components/Loader';

class CategoryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    CATEGORY: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: ''
  }

  componentDidMount() {
    const {dispatch, match} = this.props;
    const {categorySlug} = match.params;
    const catalog = localData.get(CATALOG);

    if (catalog !== null && categorySlug in catalog.categories) {        
        const id = catalog.categories[categorySlug].uuid;
        
        this.setState({id});
    }
    
  }

  render() {        
    const {
      dispatch,
      isRequesting
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
        categoryName =transformName(category.name);
        slogan = category.slogan;
    }
    const {url} = this.props.match;
    
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
          <CatalogSection name="Коллекции" headerId="collections">
            {!isRequesting && 
            category ?
              catalogSubsectionsCombiner(category.collections, url,  'brand') : <Loader />
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