import { SELECT_NAVIGATION_ITEM, navigationItems } from './../constants/navigationTypes.js';


// Объект описывающий состояние навигации.
// Его можно настраивать.
export const initNavigationState = {
	firstNavItem: {
		active: false,
		name: navigationItems.home,
		index: 'firstNavItem',
		icon: '',
		pathTo: '/'
	},
	secondNavItem: {
		active: false,
		name: navigationItems.shares,
		index: 'secondNavItem',
		icon: '',
		pathTo: '/shares'
	},
	thirdNavItem: {
		active: false,
		name: navigationItems.possibilities,
		index: 'thirdNavItem',
		icon: '',
		pathTo: '/possibilities'
	},
	fourthNavItem: {
		active: false,
		name: navigationItems.registration,
		index: 'fourthNavItem',
		icon: '',
		pathTo: '/registration'
	},
	fifthNavItem: {
		active: false,
		name: navigationItems.media,
		index: 'fifthNavItem',
		icon: '',
		pathTo: '/media'
	},
	sixthNavItem: {
		active: false,
		name: navigationItems.contacts,
		index: 'sixthNavItem',
		icon: '',
		pathTo: '/contacts'
	}
};

const navigation = (
	state=initNavigationState,
	action
) => {
	switch (action.type) {
		case SELECT_NAVIGATION_ITEM:
			return  {
				...initNavigationState,
				[action.navigationItem]: {
					...state[action.navigationItem],
					active: true
				}
			};
		default:
			return state;
	}
};

export default navigation;