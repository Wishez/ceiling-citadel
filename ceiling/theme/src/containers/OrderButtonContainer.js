import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  openCart
} from "@/actions/cart";

import OrderButton from "@/components/OrderButton";
import { openOrder } from "@/actions/order";

class OrderButtonContainer extends PureComponent {
  static propTypes = {
    quantityOrderedProducts: PropTypes.number.isRequired,
    isCartOpened: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    isShownHelpText: PropTypes.bool.isRequired,
    helpText: PropTypes.string.isRequired,
    cartPosition: PropTypes.string.isRequired,
    cartModifier: PropTypes.string.isRequired,
    modifier: PropTypes.string,
    className: PropTypes.string
  };

  openCart = () => {
    const { dispatch, cartPosition } = this.props;

    dispatch(openCart(cartPosition));
  };

  openOrderForm = () => {
    const { dispatch } = this.props;

    dispatch(openOrder());
  };

  render() {
    const { cartPosition, isCartOpened, className } = this.props;

    return (
      <OrderButton
        {...this.props}
        isCartOpened={isCartOpened === cartPosition}
        openCart={this.openCart}
        className={className}
        openOrder={this.openOrderForm}
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
