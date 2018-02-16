import { 
  SELECT_NAVIGATION_ITEM, 
  navigationItems,
  CLOSE_MENU,
  OPEN_MENU
} from './../constants/navigationTypes.js';


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
    name: navigationItems.catalog,
    index: 'secondNavItem',
    icon: '',
    pathTo: '/catalog/'
  },
  thirdNavItem: {
    active: false,
    name: navigationItems.service,
    index: 'thirdNavItem',
    icon: '',
    pathTo: '/service/'
  },
  fourthNavItem: {
    active: false,
    name: navigationItems.contacts,
    index: 'fourthNavItem',
    icon: '',
    pathTo: '/contacts/'
  },
  isMenuOpened: false
};

const navigation = (
  state=initNavigationState,
  action
) => {
  switch (action.type) {
    case SELECT_NAVIGATION_ITEM:
      return {
        ...initNavigationState,
        [action.navigationItem]: {
          ...state[action.navigationItem],
          active: true
        }
      };
    case OPEN_MENU:
      return {
        ...state,
        isMenuOpened: true
      };
    case CLOSE_MENU:
      return {
        ...state,
        isMenuOpened: false
      };
    default:
      return state;
  }
};

export default navigation;
