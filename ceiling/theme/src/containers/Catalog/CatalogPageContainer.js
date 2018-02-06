import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import {CATALOG} from './../../constants/catalog';

import getClass from './../../constants/classes';
import picture from './../../images/icons/picture.png';
// import { slideTo } from './../../constants/pureFunctions';
import {localData} from './../../constants/pureFunctions.js';
import CatalogSection from './../../components/CatalogSection';
import Figure from './../../components/Figure';

class CatalogPageContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  }

  componentDidMount() {

  }
  

  render() {  
    const catalog = localData.get(CATALOG); 


    return (
      <div className={getClass({b: 'container', m: "main", add: "parent column centered catalogSection"})}>
         <div className={getClass({b: 'catalogHeader', add: "parent row centered"})}> 
            <h1 className={getClass({b: 'catalogSection', el: "title", add: "parent row centered baseChild"})}>
              Выставочный зал
              <Figure name="picture" url={picture} maxWidth={68} />
            </h1>
            <ul className={getClass({b: 'catalogRefersList', add: "parent row h-start baseChild"})}>
                <li classNames={getClass({b: 'catalogRefer'})}>
                  <a href="#brands" 
                    
                    className={getClass({b: "catalogRefer", el: "refer"})}>Бренды</a>,
                </li>
                <li classNames={getClass({b: 'catalogRefer'})}>
                  <a href="#categiries" 
                    
                    className={getClass({b: "catalogRefer", el: "refer"})}>Категория</a>,
                </li>

            </ul>
            <p className={getClass({b: 'catalogSection', el: "slogan", add: "parent row h-end baseChild"})}>
                Цитадель потолочных покрытий
            </p>
        </div>

        {/*<CatalogSection name="Основные бренды" titleShown={false}>
          {!isRequesting && 
          catalog !== null && 
          "brands" in catalog && 
          catalog.brands.length ?
            catalogBrandsCombiner([...catalog.brands]) : <Loader />
          }
        </CatalogSection>*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // const { catalog } = state;

  return {
    // ...catalog
  };
};

export default withRouter(connect(mapStateToProps)(CatalogPageContainer));