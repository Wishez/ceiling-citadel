import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from './../components/Logo';
import NavContainer from './NavContainer.js'; 
import getClass from './../constants/classes';
import Contacts from './../components/Contacts';
import SearchContainer from './SearchContainer';
import OrderButton from './../components/OrderButton';
import CallbackButton from './../components/CallbackButton';
import ButtonsGroup from './../components/ButtonsGroup';

import { 
  openCart, 
  closeCart, 
  changeProductQuantity, 
  deleteProductAndNotifyAbout
} from './../actions/cart';
import {cartPositions} from './../constants/cart';

import {openCallback} from './../actions/callback';
import {openOrder} from './../actions/order';
import { getDeleteProductArguments } from './../constants/pureFunctions';

class  HeaderContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    quantityOrderedProducts: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isCartOpened: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isCallbackOpened: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    isShownHelpText: PropTypes.bool.isRequired,
    helpText: PropTypes.string.isRequired
  }

 
  deleteProduct = (index, name, quantityOrderedProducts) => () => {
    const { dispatch } = this.props;
    

    dispatch(
      deleteProductAndNotifyAbout(
        ...getDeleteProductArguments(index, name, quantityOrderedProducts)
      )
    );

  }
  onSubmitQuantityProduct = index => e => {
      const { dispatch } = this.props;
      dispatch(changeProductQuantity(index, e.target.value));
  }

  showCart = () => {
    const { dispatch } = this.props;
    console.log(cartPositions.header);
    dispatch(openCart(cartPositions.header));
  }

  hideCart = () => {
    const { dispatch } = this.props;

    dispatch(closeCart());
  }
  openOrderForm = () => { 
    const { dispatch } = this.props;
    dispatch(openOrder());
  }
  openCallbackForm = () => { 
    const { dispatch } = this.props;
    dispatch(openCallback());
  }

  render() {
    const {
      isCartOpened
    } = this.props;
    const currentWidth = window.innerWidth;
    const isBigScreen = currentWidth > 1199;
  
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
               <CallbackButton {...this.props}
                  closeCallback={this.closeCallbackForm}
                  openCallback={this.openCallbackForm} />
               <OrderButton {...this.props} 
                 isCartOpened={isCartOpened === cartPositions.header}
                 openCart={this.showCart} 
                 cartModifier="hover_bottom"
                 closeCart={this.hideCart}
                 openOrder={this.openOrderForm}
                 onSubmitQuantityProduct={this.onSubmitQuantityProduct}
                 deleteProduct={this.deleteProduct}
                />
             </ButtonsGroup>

          </div>
        </header>
    );
  }
}



const mapStateToProps = state => {
  const { cart, callback } = state;

  const { 
    quantityOrderedProducts,
    isCartOpened,
    products,
    isShownHelpText,
    helpText
  } = cart;

  const { isCallbackOpened } = callback;

  return {
    quantityOrderedProducts,
    isCartOpened,
    products,
    isShownHelpText,
    helpText,
    isCallbackOpened
  };
}
      

export default connect(mapStateToProps)(HeaderContainer);