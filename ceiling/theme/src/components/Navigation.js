import React from 'react';
import NavItem from './NavItem';
import getClass, { composeClasses } from './../constants/classes';

const Navigation = ({
  navigationItems,
  closeMenu,
  changeActiveNavigationItem,
  isOpened,
  getActiveClasses,
  navStyles,
  isFooter,
  modifier,
  onClick,
  ...rest
}) => (
  <nav aria-label="Навигация сайта" 
    className={getClass(composeClasses('navigation', '', isFooter || isOpened ? 'opened' : 'closed', `parent centered column baseChild${isFooter ? ' navigation_footer' : ''}`))}
  >
    <ul className={getClass({
      b: 'navList',
      add: 'parent centered column baseChild'
    })}
    style={navStyles}>
      { 
        navigationItems.map((item, index) => (
          <li className={getClass(
            composeClasses('navItem', '', item.active ? 'active' : '', '')
          )} 
          key={index}
          onClick={changeActiveNavigationItem(item.index)} 
          >  
            <NavItem
              block='navItem'
              href={item.pathTo}
              isActive={item.active}
              {...rest}
            >
              {item.name ? item.name : ''}
            </NavItem>
          </li>
        )
        )// end map
      }
    </ul>
  </nav>
);
  

export default Navigation;
