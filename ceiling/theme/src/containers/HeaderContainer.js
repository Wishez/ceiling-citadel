import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchContainer from './SearchContainer';
import NavContainer from './NavContainer.js'; 
import OrderButtonContainer from './OrderButtonContainer';
import CallbackButtonContainer from './CallbackButtonContainer';

import Logo from './../components/Logo';
import Contacts from './../components/Contacts';
import ButtonsGroup from './../components/ButtonsGroup';

import {cartPositions} from './../constants/cart';
import getClass from './../constants/classes';


class  HeaderContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }

 
  render() {
    const isBigScreen = window.innerWidth > 1199;
  
    return (
        <header className={getClass({b: 'header'})}>
          <div className={getClass({b: 'container',  add: "parent row v-centered h-around"})}>
              <NavContainer isFooter={false} />
  
             <Logo maxWidth={isBigScreen ? 50 : 65} modifier="header"/>
             <div className={getClass({b: 'infoHeaderBlock'})}>  
                
                <Contacts 
                  {...this.props}
                />
                <SearchContainer modifier="header" />
             </div>
             <ButtonsGroup className="baseChild" modifier="header">
               <CallbackButtonContainer {...this.props}
                  openCallback={this.openCallbackForm} />
               <OrderButtonContainer
                  cartPosition={cartPositions.header}
                  cartModifier="hover_bottom"
                />
             </ButtonsGroup>

          </div>
        </header>
    );
  }
}



const mapStateToProps = state => {
  
  return {};
}
      

export default connect(mapStateToProps)(HeaderContainer);