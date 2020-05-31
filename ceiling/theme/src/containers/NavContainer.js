import React, { PureComponent } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navigation from "./../components/Navigation";
import MenuButton from "./../components/MenuButton";
import { selectNavigationItem, openMenu as openMenuClicked, closeMenu as closeMenuClicked } from "./../actions/navigationActions.js";
import getClass from "./../constants/classes";
import { timeout, slideTo } from "./../constants/pureFunctions";

class NavContainer extends PureComponent {
  static propTypes = {
    navigationItems: PropTypes.array.isRequired,
    isOpened: PropTypes.bool.isRequired,
    isFooter: PropTypes.bool,
    modifier: PropTypes.string,
    isStaticMenu: PropTypes.bool,
  }

  state = {
    navStyles: {},
  };

  getActiveClasses = (state) => (
    classNames({
      navItem: true,
      "navItem--active": state,
    })
  )

  render() {
    const { isOpened, isFooter, modifier, isStaticMenu, changeActiveNavigationItem, openMenu, closeMenu } = this.props;
    const isStaticMenuShown = isStaticMenu || isFooter;
    return (
      <div className={getClass({
        b: isFooter ? "footerNavigationContainer" : "navigationContainer",
        m: modifier,
      })}
      >
        {!isStaticMenuShown ? (
          <MenuButton
            isOpened={isOpened}
            openMenu={openMenu}
            closeMenu={closeMenu}
          />
        ) : ("")}

        <Navigation
          {...this.props}
          isStaticMenuShown={isStaticMenuShown}
          getActiveClasses={this.getActiveClasses}
          changeActiveNavigationItem={changeActiveNavigationItem}
        />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { navigation } = state;
  const { isMenuOpened } = navigation;

  const navigationItems = [];
  for (const key in navigation) {
    const value = navigation[key];

    if (typeof value === "object") {
      navigationItems.push(value);
    }
  }

  return {
    navigationItems,
    isOpened: isMenuOpened,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openMenu: () => {
    dispatch(openMenuClicked());
  },

  closeMenu: () => {
    dispatch(closeMenuClicked());
  },

  changeActiveNavigationItem: (navigationItem) => () => {
    dispatch(selectNavigationItem(navigationItem));
    dispatch(closeMenuClicked());

    timeout(() => {
      slideTo({ selector: ".header" });
    }, 500);
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavContainer));
