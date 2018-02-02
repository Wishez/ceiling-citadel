
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
import QuestionFormContainer from './../containers/QuestionFormContainer';

import { 
  openCart, 
  closeCart, 
  changeProductQuantity, 
  deleteProductAndNotifyAbout 
} from './../actions/cart';

import {openCallback} from './../actions/callback';
import {openOrder} from './../actions/order';
import { getDeleteProductArguments } from './../constants/pureFunctions';

class  HeaderContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    quantityOrderedProducts: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isCartOpened: PropTypes.bool.isRequired,
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
    dispatch(openCart());
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
    return (
        <footer className={getClass({b: 'header'})}>
          <QuestionFormContainer />
          <div className={getClass({b: 'container',  add: "parent row v-centered h-around"})}>
			<div className={getClass({b: 'firstFooterBlock',  add: "parent column v-centered h-around baseChild"})}>
				 <SearchContainer />
				 <ButtonsGroup className="baseChild">
				   <CallbackButton {...this.props}
				      closeCallback={this.closeCallbackForm}
				      openCallback={this.openCallbackForm} />
				   <OrderButton {...this.props} 
				     openCart={this.showCart} 
				     closeCart={this.hideCart}
				     openOrder={this.openOrderForm}
				     onSubmitQuantityProduct={this.onSubmitQuantityProduct}
				     deleteProduct={this.deleteProduct}
				    />
				 </ButtonsGroup>
			</div>

             <NavContainer isFooter={true} modifier="footer" className="baseChild" />
             <div className={getClass({b: 'thirdFooterBlock',  add: "parent column v-centered h-around baseChild"})}>
		        <Logo />
		        <Contacts 
		            {...this.props}
		        />
			 </div>
          </div>
        </footer>
    );
  }
}



const mapStateToProps = state => {
  const {  cart, callback } = state;

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