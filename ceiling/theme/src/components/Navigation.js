import React from "react";
import NavItem from "./NavItem";
import getClass, { composeClasses } from "./../constants/classes";

const Navigation = (props) => {
  const {
    navigationItems,
    changeActiveNavigationItem,
    navStyles,
    isOpened,
    isStaticMenu,
    isFooter,
    ...rest
  } = props;
  const openedState = isOpened || isFooter ? "opened" : "closed";
  const menuModifiers = isStaticMenu ? "static" : openedState;
  const navClasses = composeClasses("navigation", "", menuModifiers, `parent centered column baseChild${isFooter ? " navigation_footer" : ""}`);

  return (
    <nav aria-label="Навигация сайта" className={getClass(navClasses)}>
      <ul className={getClass({
        b: "navList",
        add: "parent centered column baseChild"
      })}
      style={navStyles}>
        { 
          navigationItems.map((item, index) => (
            <li className={getClass(
              composeClasses("navItem", "", item.active ? "active" : "", "")
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
                {item.name ? item.name : ""}
              </NavItem>
            </li>
          )
          )
        }
      </ul>
    </nav>
  );
};
  

export default Navigation;
