import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PopupFormContainer from '@/components/PopupFormContainer';
import Characteristics from '../Catalog/Characteristics';
import {timer} from '@/constants/pureFunctions';
import {hideProductInfo} from '@/actions/cart';
const Rx = require('rxjs/Rx');

import {
  changeProductQuantityAndUpdateInfo
} from '@/actions/cart';

class CartProductInfo extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    length: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    thickness: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    productIndex: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      quantityProductsSubsciption: false
    };
  }

  hideProductInfo = () => {
    const {dispatch} = this.props;

    dispatch(hideProductInfo());
  }

  changeProductQuantity = quantity => {
    const {
      dispatch,
      productIndex
    } = this.props;
    console.log( 'i:', productIndex, 'q:', quantity);

    dispatch(changeProductQuantityAndUpdateInfo({
      id: productIndex,
      productInfo: {
        quantity
      },
      quantity
    }));
  };


  componentDidMount() {
    const {quantity} = this.props;
    const {qunatityProductsInput} = this.refs;

    qunatityProductsInput.value = quantity;

    const observer = {
      next: timer(this.changeProductQuantity, 500)
    };
    const quantityProductsObservable = Rx.Observable.fromEvent(qunatityProductsInput, 'input');

    const quantityProductsSubscribtion = quantityProductsObservable
      .map((event) => (
        event.target.value
      ))
      .subscribe(observer);

    this.setState({
      quantityProductsSubscribtion
    });
  }

  componentWillUnmount() {
    this.unsubscribeWatchForQuantityProducts();
  }

  unsubscribeWatchForQuantityProducts() {
    const {quantityProductsSubscribtion} = this.state;

    quantityProductsSubscribtion.unsubscribe();
  }

  render() {
    const {
      isProductInfoShown,
      name,
      quantity,
      length,
      thickness,
      width,
      ...rest
    } = this.props;

    return (
      <PopupFormContainer
        signification={name}
        visible={isProductInfoShown}
        closeButton={{
          onClick: this.hideProductInfo
        }}
        className='padding-left_extra-large'
      >
        <p className="margin-top_zero">Количество: {quantity}шт.</p>

        {width && length ? (
          <p>
            Квадратные метры: {width * length * quantity}²<br />
          </p>
        ) : (
          ''
        )}

        <Characteristics
          width={width}
          length={length}
          thickness={thickness}
          modifier="static"
          {...rest}
        />

        <input
          ref="qunatityProductsInput"
          type="number"
          max="10000"
          min="1"
          title="Количество продукта"
          className="productController position_absolute"
        />
      </PopupFormContainer>
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;

  const { productModalInfo} = cart;
  const { name, quantity, length, thickness, width, ...rest } = productModalInfo;

  return {
    name,
    quantity,
    length,
    thickness,
    width,
    ...rest
  };
};

export default withRouter(connect(mapStateToProps)(CartProductInfo));
