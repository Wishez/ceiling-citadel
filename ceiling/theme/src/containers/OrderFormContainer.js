import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { tryMakeOrder, closeOrder, notifyAboutFailureOrderingOrder } from '@/actions/order';

import { PRODUCTION_STORE } from '@/constants/cart';

import OrderForm from '@/components/OrderForm';
import PopupFormContainer from '@/components/PopupFormContainer';
import Loader from '@/components/Loader';

class OrderFormContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isOrderOpened: PropTypes.bool.isRequired,
    helpText: PropTypes.string.isRequired,
    isShownHelpText: PropTypes.bool.isRequired,
    isOrderedOrder: PropTypes.bool.isRequired,
    isRequesting: PropTypes.bool.isRequired
  };

  submitOrder = (userData, dispatch) => {
    this.getOrderedProducts().then((cartProducts) => {
      if (!cartProducts.length) {
        this.notifyUserAboutHisEmptyCart();
      } else {
        userData.products = cartProducts;

        dispatch(tryMakeOrder(userData));
      }


    });
  };

  getOrderedProducts() {
    return localforage.getItem(PRODUCTION_STORE).then((cartProducts) => {
      cartProducts = cartProducts || [];

      return cartProducts;
    });
  }

  closeOrderPopup = () => {
    const {dispatch} =  this.props;

    dispatch(closeOrder());
  }


  notifyUserAboutHisEmptyCart = () => {
    const {dispatch} = this.props;
    const hintMessage = 'Чтобы сделать заказ, нужно что-нибудь положить в вашу корзину';

    dispatch(
      notifyAboutFailureOrderingOrder(hintMessage)
    );
  }

  render() {
    const { helpText, isOrderedOrder, isRequesting } = this.props;

    return (
      <PopupFormContainer
        closeButton={{
          onClick: this.closeOrderPopup
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
            helpText={helpText.toString()}
          />
        ) : (
          <p className="successfull">
            {ReactHtmlParser(helpText)}
          </p>
        )}
      </PopupFormContainer>
    );
  }
}

const mapStateToProps = state => {
  const { order } = state;

  return {
    ...order
  };
};

export default connect(mapStateToProps)(OrderFormContainer);
