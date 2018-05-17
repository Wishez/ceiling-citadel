import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { tryMakeOrder, closeOrder } from '@/actions/order';
import {
  changeProductQuantity,
  deleteProductAndNotifyAbout
} from '@/actions/cart';

import { PRODUCTION_STORE } from '@/constants/cart';

import OrderForm from '@/components/OrderForm';
import PopupFormContainer from '@/components/PopupFormContainer';
import Loader from '@/components/Loader';

import { getDeleteProductArguments } from '@/constants/pureFunctions';

class OrderFormContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isOrderOpened: PropTypes.bool.isRequired,
    helpText: PropTypes.string.isRequired,
    isShownHelpText: PropTypes.bool.isRequired,
    isOrderedOrder: PropTypes.bool.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    quantityOrderedProducts: PropTypes.number.isRequired
  };

  state = {
    cartProducts: []
  };

  componentWillMount() {
    this.renderOrderedProducts();
  }

  renderOrderedProducts() {
    localforage.getItem(PRODUCTION_STORE).then((cartProducts) => {
      cartProducts = cartProducts || [];

      this.setState({ cartProducts });

      return cartProducts;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {quantityOrderedProducts} = this.props;
    const currentOrdredProductQuantity = prevState.cartProducts.length;

    if (currentOrdredProductQuantity !== quantityOrderedProducts) {
      this.renderOrderedProducts();
    }
  }

  submitOrder = (values, dispatch) => {
    this.renderOrderedProducts().then((cartProducts) => {
      if (!cartProducts.length) {
        return false;
      }

      dispatch(tryMakeOrder(values));
    });
  };

  onClickCloseButton = () => {
    const { dispatch } = this.props;
    dispatch(closeOrder());
  };

  deleteProduct = (index, name, quantityOrderedProducts) => () => {
    const { dispatch } = this.props;

    dispatch(
      deleteProductAndNotifyAbout(
        ...getDeleteProductArguments(index, name, quantityOrderedProducts)
      )
    );
  };

  onSubmitQuantityProduct = index => e => {
    const { dispatch } = this.props;

    dispatch(changeProductQuantity(index, e.target.value));
    this.forceUpdate();
  };

  render() {
    const { helpText, isOrderedOrder, isRequesting } = this.props;
    const {cartProducts} = this.state;

    // TODO there is not products when open cart by click on star. Fix it.

    return (
      <PopupFormContainer
        closeButton={{
          onClick: this.onClickCloseButton
        }}
        signification="Заказ"
        {...this.props}
      >

        {!isOrderedOrder ? (
          <OrderForm
            buttonOptions={{
              content: !isRequesting ?
                'Заказать'
                : <Loader />
            }}
            id="orderForm"
            onSubmit={this.submitOrder}
            {...this.props}
            cartProducts={cartProducts}
            helpText={helpText.toString()}
            deleteProduct={this.deleteProduct}
            onSubmitQuantityProduct={this.onSubmitQuantityProduct}
          />
        ) : (
          <p className="successfull">{ReactHtmlParser(helpText)}</p>
        )}
      </PopupFormContainer>
    );
  }
}

const mapStateToProps = state => {
  const { order, cart } = state;
  const { quantityOrderedProducts } = cart;

  return {
    ...order,
    quantityOrderedProducts
  };
};

export default connect(mapStateToProps)(OrderFormContainer);
