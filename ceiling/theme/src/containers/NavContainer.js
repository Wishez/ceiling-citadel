import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navigation from './../components/Navigation';
import MenuButton from './../components/MenuButton';
import { selectNavigationItem, openMenu as open, closeMenu as close } from './../actions/navigationActions.js';


class NavContainer extends Component {
  static propTypes = { 
      navigationItems: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired,
      isOpened: PropTypes.bool.isRequired
  }

  state = {
      navStyles: {
      }
  };

  openMenu = () => {
    const { dispatch } = this.props;
    dispatch(open());
    // const isMobile = window.innerWidth <= 800;

    // if (isMobile) {

    //   if (!this.state.isOpen) {
    //     this.setState({
    //       isOpen: true,
    //       navStyles: {
    //         'width': '100%',
    //         'opacity': '1'
    //       }
    //     });
        
    //   } else {
    //       this.closeMenu();
    //   }
    // }
  };

  // smoothRise = e => {
  //   let element = $(e.target).attr('href');
  //   if (!element)
  //     element = $(e.target).parent().attr('href');
  //   const pathTo = $(element).offset().top;
    
  //   $('body, html')
  //     .stop()
  //     .animate({
  //       scrollTop: pathTo
  //     }, 800);
  // }

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
    const { isOpened } = this.props;
    return (
      <div>
        <MenuButton 
            isOpened={isOpened}
            openMenu={this.openMenu}
            closeMenu={this.closeMenu} />
        <Navigation {...this.props}
            navStyles={this.state.navStyles}
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

  for (const prop in navigation) {
    navigationItems.push(navigation[prop]);
  }
  
  return {
    navigationItems,
    isOpened: isMenuOpened
  }
}

export default withRouter(connect(mapStateToProps)(NavContainer));