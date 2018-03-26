import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loader from './../../components/Loader';

import catalogStore, {CATALOG} from './../../constants/catalog';
import getClass from './../../constants/classes';
import {localData, getArray} from './../../constants/pureFunctions.js';
import {catalogSectionCombiner, catalogSubsectionsCombiner} from './../../constants/filter';
import {catalogBrandUrl, catalogCategoryUrl} from './../../constants/conf';

import picture from './../../images/icons/picture.png';

import { slideTo } from './../../constants/pureFunctions';
import CatalogSection from './../../components/catalog/CatalogSection';
import Figure from './../../components/Figure';



class CatalogPageContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    isRequesting: PropTypes.bool.isRequired,
  }
  state = {
    isCatalogGotten: false,
    categories: [],
    brands: [] 
  }
  gogo = selector => {
    return event => {
      event.preventDefault();
      slideTo({
        selector
      });

      return false;
    };
  }
  render() {  
    const { isRequesting } = this.props;
    const {
      isCatalogGotten,
      categories,
      brands
    } = this.state;


    // const catalog = localData.get(CATALOG); 
    
    if (!isCatalogGotten) {
      catalogStore.getItem(
        CATALOG, 
        (err, catalog) => {
          if (catalog !== null) {
          
            this.setState({ 
              brands: catalogSectionCombiner(
                getArray(catalog.brands), 
                catalogBrandUrl
              ),
              categories: catalogSubsectionsCombiner(
                getArray(catalog.categories), 
                catalogCategoryUrl, 
                'section'
              ),
              isCatalogGotten: true
            });
          }
        });
    }
   
    
    return (
      <div className={getClass({b: 'container', m: 'main', add: 'parent column centered'})}>
        <div className={getClass({b: 'catalogHeader',m: 'catalog', add: 'parent row v-start h-centered'})}> 
          <h1 className={getClass({b: 'catalogHeader', el: 'title', m: 'catalog', add: 'parent row centered baseChild'})}>
              Выставочный зал
            <Figure name="picture" url={picture} maxWidth={68} />
          </h1>
          <ul className='catalogRefersList parent row h-around baseChild'>
            <li className='catalogRefer'>
              <a href="#brands" onClick={this.gogo('#brands')} className={getClass({b: 'catalogRefer', el: 'refer'})}>Бренды</a>
            </li>
            <li className={getClass({b: 'catalogRefer'})}>
              <a href="#categories" onClick={this.gogo('#categories')} className={getClass({b: 'catalogRefer', el: 'refer'})}>Категории</a>
            </li>

          </ul>
          <p className={getClass({b: 'catalogHeader', el: 'slogan', add: 'parent row h-end baseChild darkBlue'})}>
                Цитадель потолочных покрытий
          </p>
        </div>

        <CatalogSection name="Бренды" headerId="brands">
          {!isRequesting && 
          brands.length ?
            brands
            : ''
          }
          {/*<Loader />*/}
        </CatalogSection>
        <CatalogSection name="Категории" headerId="categories">
          {!isRequesting && 
            categories.length ?
            categories : '' 
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
