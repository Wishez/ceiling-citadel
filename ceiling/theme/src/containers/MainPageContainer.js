import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CatalogSection from './../components/CatalogSection';
import CatalogItem from './../components/CatalogItem';
import Loader from './../components/Loader';
import AboutSection from './../components/AboutSection';
import getClass from './../constants/classes';
import {localData} from './../constants/pureFunctions';
import { initNavigationState } from './../reducers/navigation';
import { selectNavigationItem } from './../actions/navigationActions';
import { tryFetchCatalog } from './../actions/catalog';
import { catalogBrandsCombiner } from './../constants/filter';
import { CATALOG } from './../constants/catalog';

import sharp from './../images/about/sharp_first.png';

class MainPageContainer extends Component {
	static PropTypes = {
		dispatch: PropTypes.func.isRequired,
		match: PropTypes.object,
		location: PropTypes.object,
		isRequesting: PropTypes.bool.isRequired
	}

	componentDidMount() {
		const { dispatch } = this.props;
		
		dispatch(tryFetchCatalog());
		dispatch(selectNavigationItem(initNavigationState.firstNavItem.index));

    }

	render() {
		const { isRequesting } = this.props;
		const catalog = localData.get(CATALOG);

		return (
			<main id="main" className={getClass({b: 'main'})}>
				<div className={getClass({b: 'container', m: "main", add: "parent column centered"})}>
					<CatalogSection name="Основные бренды" titleShown={false}>
						{!isRequesting && 
						catalog !== null && 
						"brands" in catalog && 
						catalog.brands.length ?
							catalogBrandsCombiner(catalog.brands) : <Loader />
						}
					</CatalogSection>
					<AboutSection text="Мы поставщики большого объёма дизайнерских потолков, под кодовым именем ArtCeil."
						title="приятно познакомиться"
						image={sharp} 
						sources={[{url: sharp, media: `max-width: ${992 / 16}em`}]} />

				</div>
			</main>
		);
	}
}

const mapStateToProps = state => {
	const { catalog } = state;
	const { isRequesting } = catalog;
	
	return {
		isRequesting
	};
}

export default withRouter(connect(mapStateToProps)(MainPageContainer));