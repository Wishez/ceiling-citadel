import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  CATALOG,
  COLLECTION
} from '@/constants/catalog';
import {transformName} from '@/constants/pureFunctions';
import {catalogSectionCombiner, findUUID} from './../../constants/filter';

import BaseCatalogContainer from './BaseCatalogContainer';
import CatalogSection from '@/components/Catalog/CatalogSection';

import {fetchCatalogEntityOrGetLocale} from '@/actions/catalog';




class BrandCategoryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    COLLECTION: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isRequesting: PropTypes.bool.isRequired,

  }

  state = {
    id: '',
    categoryName: '',
    collection: false,
    slogan: '',
    collectionName: ''
  }

  requestCollection = (force=false) => {
    const {id, collectionName} = this.state;
    const {dispatch} = this.props;

    if (id) {
      const request = dispatch(
        fetchCatalogEntityOrGetLocale(COLLECTION, id, force)
      );

      if (request) {

        request.then(collection => {
          if (collection) {
            const transformedName = transformName(collection.name);

            if (transformedName !== collectionName) {
              this.setState({
                collectionName: transformedName,
                slogan: collection.slogan,
                collection: collection,
              });
            }
          }
        });
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const {
      collectionSlug,
      categorySlug
    } = this.props.match.params;

    const {COLLECTION} = this.props;

    if (COLLECTION !== nextProps.COLLECTION) {
      this.setState({
        collection: false
      });
    }

    const newCollectionSlug = nextProps.match.params.collectionSlug;
    const newCategorySlug = nextProps.match.params.collectionSlug;

    if (newCollectionSlug !== collectionSlug) {
      this.getIdFromCatalog(
        () => { this.requestCollection(true); },
        newCollectionSlug,
        newCategorySlug
      );
    }
  }

  getIdFromCatalog = (
    callback=false,
    newCollectionSlug=false,
    newCategorySlug=false
  ) => {
    const {match} = this.props;
    let {collectionSlug, categorySlug} = match.params;

    if (newCollectionSlug) {
      collectionSlug = newCollectionSlug;
      categorySlug = newCategorySlug;
    }

    localforage.getItem(CATALOG, (error, catalog) => {

      if (catalog !== null && categorySlug in catalog.categories) {
        const category = catalog.categories[categorySlug];

        const id = findUUID(category.collections, collectionSlug);

        this.setState({
          categoryName: transformName(category.name),
          id
        });

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
      categoryName,
      collection,
      collectionName,
      slogan
    } = this.state;

    if (!collection) {
      this.requestCollection();
    }


    return (
      <BaseCatalogContainer name={collectionName}
        slogan={slogan}
        routes={{
          '/catalog': 'Каталог',
          '/catalog/category': false,
          '/catalog/category/:categorySlug': categoryName,
          '/catalog/category/collection': false
        }}
        CONSTANT={COLLECTION}
      >
        <CatalogSection name="Образцы" headerId="collections">
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

export default withRouter(connect(mapStateToProps)(BrandCategoryContainer));
