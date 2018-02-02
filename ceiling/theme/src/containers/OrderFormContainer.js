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
import { getDeleteProductArguments } from './../constants/pureFunctions';

class OrderFormContainer extends Component {
  static propTypes = { 
      dispatch: PropTypes.func.isRequired,
      isOrderOpened: PropTypes.bool.isRequired,
      helpText: PropTypes.string.isRequired,
      isShownHelpText: PropTypes.bool.isRequired,
      isOrderedOrder: PropTypes.bool.isRequired,
      isRequesting: PropTypes.bool.isRequired,
      products: PropTypes.array.isRequired,
      quantityOrderedProducts: PropTypes.number.isRequired,
  }

  submitOrder = (values, dispatch) => {
    // if (values.length < 3 ) return false;
    values.products = this.props.products;
    console.log(values);
    dispatch(tryMakeOrder(values));
  }

  onClickCloseButton = () => {
    const { dispatch } = this.props;
    dispatch(closeOrder());
  }

  deleteProduct = (index, name, quantityOrderedProducts) => () => {
    const { dispatch } = this.props;
    console.log(index, name, quantityOrderedProducts);
      
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

  render() {
    const { helpText, isOrderedOrder, isRequesting } = this.props;
    

    return (
      <PopupFormContainer  
        closeButton={{
          onClick: this.onClickCloseButton
        }} 
        signification="Заказ"
        {...this.props}>
        {!isOrderedOrder ? 
        <OrderForm buttonOptions={{ 
          content: !isRequesting ? "Заказать" : <Loader />,
        }}
          onSubmit={this.submitOrder} 
          {...this.props}
          helpText={helpText.toString()}
          deleteProduct={this.deleteProduct}
          onSubmitQuantityProduct={this.onSubmitQuantityProduct}

        /> :
          <p className={getClass({b: "successfull"})}>{ReactHtmlParser(helpText)}</p>
        }

      </PopupFormContainer>
    );
  }
}


const mapStateToProps = state => {
  const { order, cart } = state;
  const { products, quantityOrderedProducts } = cart;
  console.log(products, quantityOrderedProducts);
  return {
    ...order,
    products,
    quantityOrderedProducts
  };
};

export default connect(mapStateToProps)(OrderFormContainer);