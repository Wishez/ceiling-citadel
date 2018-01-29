import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import lozad from 'lozad'


import { 
	images,
	catalogs,
	activities,
	catalogSliderCustoms,
	mainSliderCustoms
 } from './../constants/conf.js';
import { selectNavigationItem } from './../actions/navigationActions.js'; 
import { initNavigationState } from './../reducers/navigation.js';

import MainSlider from './../components/MainSlider';
import Present from './../components/Present';
import About from './../components/About';
import Catalogs from './../components/Catalogs';

class MainPageContainer extends Component {
	static PropTypes = {
		dispatch: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(selectNavigationItem(initNavigationState.firstNavItem.index));
    }

	render() {
		const slidesUrls = JSON.parse(localStorage.getItem('slidesUrls'));
		return (
			<main className='main'>
				<MainSlider images={
					slidesUrls.length
						? slidesUrls : 
						images}
					{...mainSliderCustoms} />
				<Present />
				<About activities={activities}/>
				<Catalogs catalogs={catalogs}
					sliderCustoms={catalogSliderCustoms} />
			</main>
		);
	}
}

const mapStateToProps = state => {


	return {
	
	};
}

export default withRouter(connect(mapStateToProps)(MainPageContainer));