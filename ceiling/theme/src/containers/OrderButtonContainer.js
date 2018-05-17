import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  openCart,
  closeCart,
  changeProductQuantity,
  deleteProductAndNotifyAbout
} from '@/actions/cart';

import { PRODUCTION_STORE } from '@/constants/cart';

import OrderButton from '@/components/OrderButton';
import { openOrder } from '@/actions/order';
import {getDeleteProductArguments} from '@/constants/pureFunctions';

class OrderButtonContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    quantityOrderedProducts: PropTypes.number.isRequired,
    isCartOpened: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isShownHelpText: PropTypes.bool.isRequired,
    helpText: PropTypes.string.isRequired,
    cartPosition: PropTypes.string.isRequired,
    cartModifier: PropTypes.string.isRequired,
    modifier: PropTypes.string,
    className: PropTypes.string
  };

  onSubmitQuantityProduct = index => e => {
    const { dispatch } = this.props;

    dispatch(changeProductQuantity(index, e.target.value));
    this.forceUpdate();
  };

  showCart = () => {
    const { dispatch, cartPosition } = this.props;
    dispatch(openCart(cartPosition));
  };

  hideCart = () => {
    const { dispatch } = this.props;

    dispatch(closeCart());
  };

  openOrderForm = () => {
    const { dispatch } = this.props;

    dispatch(openOrder());
  };

  deleteProduct = (index, name, quantityOrderedProducts) => () => {
    const { dispatch } = this.props;

    dispatch(
      deleteProductAndNotifyAbout(
        ...getDeleteProductArguments(index, name, quantityOrderedProducts)
      )
    );
  };

  render() {
    const { cartPosition, isCartOpened, className } = this.props;

    const products = localforage.getItem(PRODUCTION_STORE);

    return (
      <OrderButton
        {...this.props}
        products={products || []}
        isCartOpened={isCartOpened === cartPosition}
        openCart={this.showCart}
        className={className}
        closeCart={this.hideCart}
        openOrder={this.openOrderForm}
        onSubmitQuantityProduct={this.onSubmitQuantityProduct}
        deleteProduct={this.deleteProduct}
      />
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;

  const {
    quantityOrderedProducts,
    isCartOpened,
    isShownHelpText,
    helpText
  } = cart;

  return {
    quantityOrderedProducts,
    isCartOpened,
    isShownHelpText,
    helpText
  };
};

export default connect(mapStateToProps)(OrderButtonContainer);
