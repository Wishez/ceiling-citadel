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

import { openCart, closeCart, changeProductQuantity, deleteProductAndNotifyAbout } from './../actions/cart';

changeProductQuantity()

class  HeaderContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    quantityOrderedProducts: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isCartOpened: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    isShownHelpText: PropTypes.bool.isRequired,
    helpText: PropTypes.string.isRequired
  }

 
  deleteProduct = (index, name, quantityOrderedProducts) => () => {
    const { dispatch } = this.props;
    const lastProudctRemovedMessage = `Вы удалили  из корзины последний продукт "${name}" ಥ⌣ಥ.`;
    const removedProductMessage = `Вы удалили из корзины "${name}" ಠ_ಠ!`
    console.log(quantityOrderedProducts - 1)
    dispatch(
      deleteProductAndNotifyAbout(
        index, 
        quantityOrderedProducts - 1 === 0 ? lastProudctRemovedMessage : removedProductMessage,
        quantityOrderedProducts - 1
      )
    );

  }

  showCart = () => {
    const { dispatch } = this.props;
    dispatch(openCart());
  }

  hideCart = () => {
    const { dispatch } = this.props;

    dispatch(closeCart());
  }

  onSubmitQuantityProduct = index => e => {
      const { dispatch } = this.props;
      console.log(`will increase quantity by index: ${index} and "quantityProduct"`, e.target.value,);
      dispatch(changeProductQuantity(index, e.target.value));
  }

  render() {
    return (
        <header className={getClass({b: 'header'})}>
          <div className={getClass({b: 'container',  add: "parent row v-centered h-around"})}>
              <NavContainer />
              <Contacts 
                {...this.props}
              />
             <Logo />
             <SearchContainer />
             <ButtonsGroup className="baseChild">
               <CallbackButton />
               <OrderButton {...this.props} 
                 openCart={this.showCart} 
                 closeCart={this.hideCart}
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
  const { app, cart } = state;

  const { 
    quantityOrderedProducts,
    isCartOpened,
    products,
    isShownHelpText,
    helpText
  } = cart;
  const { phone, email } = app;

  return {
    quantityOrderedProducts,
    phone,
    email,
    isCartOpened,
    products,
    isShownHelpText,
    helpText
  };
}
      

export default connect(mapStateToProps)(HeaderContainer);