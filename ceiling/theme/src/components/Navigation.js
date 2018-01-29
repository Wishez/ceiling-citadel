import React from 'react';
import NavItem from './NavItem';
import getClass from './../constants/classes';

const Navigation = ({
    navigationItems,
    closeMenu,
    changeActiveNavigationItem,
    smoothRise,
    getActiveClasses,
    navStyles,
    ...rest
}) => (
   <nav className={getClass({
        b: "navigation",
        add: "parent centered column"
    })}
   >
      
      <ul className={getClass({
          b: 'navList'
        })}
          id='navList'
          style={navStyles}>
          { navigationItems.map((item, index) => (
              <li className={getActiveClasses(item.active)} 
                key={index}
                onClick={changeActiveNavigationItem(item.index)} 
              >  
                <NavItem
                  block='navItem'
                  href={item.pathTo}
                  name={item.name}
                  isActive={item.active}
                  {...rest}
                />
              </li>
            ))}
        </ul>
    </nav>
  );
  

export default Navigation;
