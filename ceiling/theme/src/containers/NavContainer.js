import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navigation from './../components/Navigation';
import MenuButton from './../components/MenuButton';
import { selectNavigationItem, openMenu as open, closeMenu as close } from './../actions/navigationActions.js';
import getClass from './../constants/classes';

class NavContainer extends Component {
  static propTypes = { 
    navigationItems: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isOpened: PropTypes.bool.isRequired,
    isFooter: PropTypes.bool.isRequired,
    modifier: PropTypes.string
  }

  state = {
    navStyles: {
    }
  };

  openMenu = () => {
    const { dispatch } = this.props;
    dispatch(open());
  }

  changeActiveNavigationItem = navigationItem => () => {
    this.props.dispatch(selectNavigationItem(navigationItem));
    this.closeMenu();
  }


  getActiveClasses = state => ( 
    classNames({
      'navItem': true,
      'navItem--active': state
    })
  )
   
  closeMenu = () => {
    const { dispatch } = this.props;
    dispatch(close());
  }


  render() {
    const { 
      isOpened, 
      isFooter, 
      modifier 
    } = this.props;
    
    return (
      <div className={getClass({
        b: isFooter ? 'footerNavigationContainer' : 'navigationContainer',
        m: modifier 
      })}>
        {!isFooter ? 
          <MenuButton 
            isOpened={isOpened}
            openMenu={this.openMenu}
            closeMenu={this.closeMenu}
          />
          : ''}
        <Navigation {...this.props}
          getActiveClasses={this.getActiveClasses}
          changeActiveNavigationItem={this.changeActiveNavigationItem}
        />
        
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { navigation } = state;
  const {
    isMenuOpened
  } = navigation;

  let navigationItems = [];
  
  for (const key in navigation) {
    const value = navigation[key];
    
    if (typeof value === 'object') {
      navigationItems.push(value);
    }
  }
  
  return {
    navigationItems,
    isOpened: isMenuOpened
  };
};

export default withRouter(connect(mapStateToProps)(NavContainer));
