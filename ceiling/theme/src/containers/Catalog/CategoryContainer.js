import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BaseCatalogContainer from './BaseCatalogContainer';

import {fetchCatalogEntityOrGetLocale} from '@/actions/catalog';

import {CATALOG, CATEGORY} from '@/constants/catalog';
import {transformName} from '@/constants/pureFunctions';
import {catalogSubsectionsCombiner, catalogSectionCombiner} from '@/constants/filter';

import CatalogSection from '@/components/Catalog/CatalogSection';


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

  componentWillMount() {
    this.getIdFromCatalog();
  }

  getIdFromCatalog = (callback=false) => {
    const {match} = this.props;
    const {categorySlug} = match.params;

    localforage.getItem(CATALOG, (error, catalog) => {
      if (catalog !== null && categorySlug in catalog.categories) {
        const id = catalog.categories[categorySlug].uuid;

        this.setState({id});

        if (callback) {
          callback();
        }
      }
    });
  }

  componentWillUpdate(nextProps) {
    const {
      categorySlug
    } = this.props.match.params;
    const {CATEGORY} = this.props;
    const isCategoryUpdated = CATEGORY !== nextProps.CATEGORY;
    if (isCategoryUpdated) {
      this.cleanCurrentCategory();
    }

    const newCategorySlug = nextProps.match.params.categorySlug;

    if (newCategorySlug !== categorySlug) {
      this.getIdFromCatalog(this.makeForceRequestForCategoryAfterFindingId);
    }
  }

  cleanCurrentCategory = () => {
    this.setState({
      category: false
    });
  }



  makeForceRequestForCategoryAfterFindingId = () => {
    const isForceRequest = true;
    this.requestCategory(isForceRequest);
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
          this.renderNewCategoryIfNeeded({
            oldCategoryName: categoryName,
            category,
            id
          });
        });
      }

    }
  }

  renderNewCategoryIfNeeded = ({
    category,
    oldCategoryName,
    id
  }) => {
    if (category) {
      const transformedName = transformName(category.name);

      if (transformName !== oldCategoryName) {
        this.setState({
          categoryName: transformedName,
          slogan: category.slogan,
          category: category,
          id
        });
      }
    }
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

    const categoryProductsLength =  category && category.products.length;
    const categoryCollectionsLength =  category && category.collections.length;
    
    return (
      <BaseCatalogContainer name={categoryName}
        slogan={slogan}
        routes={{
          '/catalog': 'Каталог',
          '/catalog/category': false,
          '/catalog/category/:categorySlug': false,
        }}
        CONSTANT={CATEGORY}
      >
        <CatalogSection name="Коллекции" headerId="collections" fallback={
          !isRequesting && !categoryCollectionsLength ?
            <p className="paragraph_container">Нет отдельных коллекций.</p> : ''}>
          {
            !isRequesting &&
            categoryCollectionsLength ?
              catalogSubsectionsCombiner(category.collections, url, 'brand')
              : ''
          }
        </CatalogSection>

        <CatalogSection name="Образцы" headerId="samples" fallback={
          !isRequesting && !categoryProductsLength ?
            <p className="paragraph_container">Нет отдельных образцов.</p> : ''}>
          {
            !isRequesting &&
            categoryProductsLength ?
              catalogSectionCombiner(category.products, url) :
              ''
          }
        </CatalogSection>
      </BaseCatalogContainer>
    );
  }
}

// <CatalogSection name="Бренды" headerId="brands">
//   {!isRequesting &&
//     category ?
//     catalogSubsectionsCombiner(category.brands, url, 'brand') : ''
//   }
// </CatalogSection>

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
