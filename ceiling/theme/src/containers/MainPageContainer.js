import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import OrderButtonContainer from './OrderButtonContainer';

import CatalogSection from './../components/Catalog/CatalogSection';
import CatalogItem from './../components/Catalog/CatalogItem';
import Loader from './../components/Loader';
import AboutSection from './../components/AboutSection';
import Paragraph from './../components/Paragraph';
import Fading from './../components/Animation/Fading';

import getClass from './../constants/classes';

import {localData, getArray} from './../constants/pureFunctions';
import { catalogSectionCombiner } from './../constants/filter';
import {catalogBrandUrl} from './../constants/conf';
import { aboutSections } from './../constants/conf';
import catalogStore, { CATALOG } from './../constants/catalog';

import { initNavigationState } from './../reducers/navigation';

import { selectNavigationItem } from './../actions/navigationActions';
import { tryFetchCatalog, fetchCatalogEntityOrGetLocale } from './../actions/catalog';

import boxes from './../images/about/boxes.png';
import {cartPositions} from './../constants/cart';

class MainPageContainer extends Component {
	static propTypes = {
	  dispatch: PropTypes.func.isRequired,
	  match: PropTypes.object,
	  location: PropTypes.object,
	  isRequesting: PropTypes.bool.isRequired
	}
	state = {
	  isBrandsGotten: false,
	  brands: []
	}	
	componentDidMount() {
	  const { dispatch } = this.props;
		
	  // dispatch(tryFetchCatalog());
	  dispatch(selectNavigationItem(initNavigationState.firstNavItem.index));
	  
	}

	render() {
	  const {isRequesting} = this.props;
	  const {isBrandsGotten, brands} = this.state;

	  if (!isBrandsGotten)
		  catalogStore.getItem(
		  	CATALOG, 
		  	(err, catalog) => {
			  console.log('catalog', catalog);
			  if (catalog !== null && 'brands' in catalog) {
			    // brands = getArray(catalog.brands);
				  this.setState({ 
				  	brands: catalogSectionCombiner(
				  		getArray(catalog.brands), 
				  		catalogBrandUrl
				  	),
				  	isBrandsGotten: true
				  });
			  }
	  });
	  console.log(isRequesting);
	  return (
	    <div className={getClass({b: 'container', m: 'main', add: 'parent column centered'})}>
	      	<CatalogSection name="Основные бренды" titleShown={false}>
	    	{!isRequesting && brands.length ?
          		brands :
          		''}	
	      	</CatalogSection>
	      {aboutSections.map((section, index) => (
	        <Fading key={index}>      	
	        	<AboutSection key={index} {...section} />
	        </Fading>
	      ))}
	      <AboutSection text={false}
	        title="просторная сумка"
	        image={boxes} 
	        sources={[]} 
	        modifier="bag"
	        maxWidth={404}
	      >
	        <Paragraph text="Понравившийся потолок, или декоративную его часть, вы можете добавить в избранное, а после окончания просмотра оформить заказ." 
	          block="aboutSection" />
	        <OrderButtonContainer 
	          cartPosition={cartPositions.bag}
              			cartModifier="hover_up"
              			modifier="stretch"
              		/>
	        <Paragraph text="Заказ придёт к нам на почту, а после мы оперативно обработаем его!" 
	          block="aboutSection" />
	      </AboutSection>
	    </div>
	  );
		
		
	}
}

const mapStateToProps = state => {
  const { catalog } = state;
  const { isRequesting } = catalog;
	
  return {
    isRequesting
  };
};

export default withRouter(connect(mapStateToProps)(MainPageContainer));
