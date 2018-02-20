import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Scroll from 'react-scroll-to-element';

import {CATALOG} from './../../constants/catalog';
import getClass from './../../constants/classes';
import {localData, getArray} from './../../constants/pureFunctions.js';
import {catalogSectionCombiner, catalogSubsectionsCombiner} from './../../constants/filter';
import {catalogBrandUrl, catalogCategoryUrl} from './../../constants/conf';

import picture from './../../images/icons/picture.png';

// import { slideTo } from './../../constants/pureFunctions';
import CatalogSection from './../../components/catalog/CatalogSection';
import Figure from './../../components/Figure';



class CatalogPageContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    isRequesting: PropTypes.bool.isRequired,
  }

  render() {  
    const { isRequesting } = this.props;
    

    const catalog = localData.get(CATALOG); 
    let brands = [];
    let categories = [];
    
    if (catalog !== null && 'brands' in catalog) {
      brands = getArray(catalog.brands);
      categories = getArray(catalog.categories);
    }
    
    return (
      <div className={getClass({b: 'container', m: 'main', add: 'parent column centered'})}>
        <div className={getClass({b: 'catalogHeader',m: 'catalog', add: 'parent row v-start h-centered'})}> 
          <h1 className={getClass({b: 'catalogHeader', el: 'title', m: 'catalog', add: 'parent row centered baseChild'})}>
              Выставочный зал
            <Figure name="picture" url={picture} maxWidth={68} />
          </h1>
          <ul className={getClass({b: 'catalogRefersList', add: 'parent row h-around baseChild'})}>
            <li className={getClass({b: 'catalogRefer'})}>
              <Scroll type="id" element="brands">
                <a href="" className={getClass({b: 'catalogRefer', el: 'refer'})}>Бренды</a>
              </Scroll>
            </li>
            <li className={getClass({b: 'catalogRefer'})}>
              <Scroll type="id" element="categories">
                <a href="" className={getClass({b: 'catalogRefer', el: 'refer'})}>Категория</a>
              </Scroll>
            </li>

          </ul>
          <p className={getClass({b: 'catalogHeader', el: 'slogan', add: 'parent row h-end baseChild darkBlue'})}>
                Цитадель потолочных покрытий
          </p>
        </div>

        <CatalogSection name="Бренды" headerId="brands">
          {!isRequesting && 
          brands.length ?
            catalogSectionCombiner(brands, catalogBrandUrl)
            : ''
          }
        </CatalogSection>
        <CatalogSection name="Категории" headerId="categories">
          {!isRequesting && 
            categories.length ?
            catalogSubsectionsCombiner(categories, catalogCategoryUrl, 'section') : ''
          }
        </CatalogSection>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { catalog } = state;

  return {
    ...catalog
  };
};

export default withRouter(connect(mapStateToProps)(CatalogPageContainer));
