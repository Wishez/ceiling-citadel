import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CatalogSection from './../components/CatalogSection';
import CatalogItem from './../components/CatalogItem';
import Loader from './../components/Loader';

import getClass from './../constants/classes';
import {localData} from './../constants/pureFunctions';
import { initNavigationState } from './../reducers/navigation';
import { selectNavigationItem } from './../actions/navigationActions';
import { tryFetchCatalog } from './../actions/catalog';
import { catalogBrandsCombiner } from './../constants/filter';
import { CATALOG } from './../constants/catalog';

class MainPageContainer extends Component {
	static PropTypes = {
		dispatch: PropTypes.func.isRequired,
		match: PropTypes.object,
		location: PropTypes.object,
		isRequesting: PropTypes.bool.isRequired
	}

	componentDidMount() {
		const { dispatch } = this.props;
		console.log('will fetch')
		dispatch(tryFetchCatalog());
		dispatch(selectNavigationItem(initNavigationState.firstNavItem.index));

    }

	render() {
		const { isRequesting } = this.props;
		const catalog = localData.get(CATALOG);
		console.log(catalog);

		return (
			<main id="main" className='main'>
				<div className={getClass({b: 'container', m: "main", add: "parent column h-centered v-around"})}>
					<CatalogSection name="Основные бренды" titleShown={false}>
						{!isRequesting && 
						catalog !== null && 
						"brands" in catalog && 
						catalog.brands.length ?
							catalogBrandsCombiner(brands) : <Loader />
						}
					</CatalogSection>
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