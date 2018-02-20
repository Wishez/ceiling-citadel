import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getClass from './../constants/classes';
import OrderForm from './../components/OrderForm';
import PopupFormContainer from './../components/PopupFormContainer';
import { 
  tryMakeOrder, 
  closeOrder
} from './../actions/order';
import Loader from './../components/Loader';
import ReactHtmlParser from 'react-html-parser';

import { 
  changeProductQuantity, 
  deleteProductAndNotifyAbout 
} from './../actions/cart';

import {PRODUCTION_STORE} from './../constants/cart';

import {getDeleteProductArguments, localData} from './../constants/pureFunctions';

class OrderFormContainer extends Component {
  static propTypes = { 
    dispatch: PropTypes.func.isRequired,
    isOrderOpened: PropTypes.bool.isRequired,
    helpText: PropTypes.string.isRequired,
    isShownHelpText: PropTypes.bool.isRequired,
    isOrderedOrder: PropTypes.bool.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    quantityOrderedProducts: PropTypes.number.isRequired,
  }

  submitOrder = (values, dispatch) => {
    values.products = localData.get(PRODUCTION_STORE);
    
    if (!values.products.length)
      return false;
    dispatch(tryMakeOrder(values));
  }

  onClickCloseButton = () => {
    const { dispatch } = this.props;
    dispatch(closeOrder());
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
    this.forceUpdate();
  }

  render() {
    const { helpText, isOrderedOrder, isRequesting } = this.props;
    
    const products = localData.get(PRODUCTION_STORE) || [];

    return (
      <PopupFormContainer  
        closeButton={{
          onClick: this.onClickCloseButton
        }} 
        signification="Заказ"
        {...this.props}>
        {!isOrderedOrder ? 
          <OrderForm buttonOptions={{ 
            content: !isRequesting ? 'Заказать' : <Loader />,
          }}
          id="orderForm"
          onSubmit={this.submitOrder} 
          {...this.props}
          products={products}
          helpText={helpText.toString()}
          deleteProduct={this.deleteProduct}
          onSubmitQuantityProduct={this.onSubmitQuantityProduct}
          /> :
          <p className={getClass({b: 'successfull'})}>{ReactHtmlParser(helpText)}</p>
        }

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
