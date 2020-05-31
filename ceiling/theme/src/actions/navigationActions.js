import {
  SELECT_NAVIGATION_ITEM,
 	CLEAN_ACTIVE_STATE,
 	OPEN_MENU,
 	CLOSE_MENU,
} from "./../constants/navigationTypes.js";


export const selectNavigationItem = (navigationItem) => ({
  type: SELECT_NAVIGATION_ITEM,
  navigationItem,
});

export const cleanActiveState = () => ({
  type: CLEAN_ACTIVE_STATE,
});

export const openMenu = () => ({
  type: OPEN_MENU,
});
export const closeMenu = () => ({
  type: CLOSE_MENU,
});


export const closeNavIfNeededAndSelectNavigationItem = (navigationItem) => (dispatch) => {
  dispatch(selectNavigationItem(navigationItem));
};
