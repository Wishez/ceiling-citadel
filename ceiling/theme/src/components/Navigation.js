import React from "react";
import classNames from "classnames";
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
  const listClasses = classNames({
    centered: !isStaticMenu,
    [getClass({
      b: "navList",
      add: "parent column baseChild",
    })]: true,
  });
  const openedState = isOpened || isFooter ? "opened" : "closed";
  const menuModifiers = isStaticMenu ? "static" : openedState;
  const navClasses = classNames({
    [getClass(
      composeClasses("navigation", "", menuModifiers, "parent column baseChild")
    )]: true,
    navigation_footer: isFooter,
  });

  return (
    <nav aria-label="Навигация сайта" className={navClasses}>
      <ul
        className={listClasses}
        style={navStyles}
      >
        {
          navigationItems.map((item, index) => (
            <li
              className={getClass(
                composeClasses("navItem", "", item.active ? "active" : "", "")
              )}
              key={index}
              onClick={changeActiveNavigationItem(item.index)}
            >
              <NavItem
                block="navItem"
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
