import { 
	SELECT_NAVIGATION_ITEM,
 	CLEAN_ACTIVE_STATE 
 } from './../constants/navigationTypes.js';


export const selectNavigationItem = navigationItem => ({
	type: SELECT_NAVIGATION_ITEM,
	navigationItem
});

export const cleanActiveState = () => ({
	type: CLEAN_ACTIVE_STATE
});


export const closeNavIfNeededAndSelectNavigationItem = navigationItem => dispatch => {
	dispatch(selectNavigationItem(navigationItem));
};