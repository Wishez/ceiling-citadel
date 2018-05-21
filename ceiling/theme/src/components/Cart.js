import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Draggable from 'react-draggable';

import getClass, { composeClasses } from '@/constants/classes';
import { PRODUCTION_STORE } from '@/constants/cart';
import { getDeleteProductArguments } from '@/constants/pureFunctions';

import CloseButton from './CloseButton';
import CartProduct from './CartProduct';


import {
  closeCart,
  changeProductQuantity,
  deleteProductAndNotifyAbout
} from '@/actions/cart';

import mesh from '@/images/cart/mesh.png';

class Cart extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    block: PropTypes.string,
    modifier: PropTypes.string,
    className: PropTypes.string,
    closeButton: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    animationDuration: PropTypes.number,
    helpText: PropTypes.string,
    isShownHelpText: PropTypes.bool.isRequired,
    quantityOrderedProducts: PropTypes.number
  };

  static defaultProps = {
    animationDuration: 300,
    closeButton: false
  };

  state = {
    cartProducts: []
  };

  componentWillMount() {
    this.renderOrderedProducts();
  }

  renderOrderedProducts() {
    return localforage.getItem(PRODUCTION_STORE).then(cartProducts => {
      cartProducts = cartProducts || [];

      this.setState({ cartProducts });

      return cartProducts;
    });
  }

  componentDidMount() {
    this.showCart();
  }

  showCart = () => {
    const { cart } = this.refs;
    const { animationDuration } = this.props;

    anime({
      targets: cart,
      duration: animationDuration,
      opacity: 1,
      translateY: {
        value: 0,
        duration: animationDuration * 1.618
      },
      elacticity: 100,
      timing: 'easeInOutQuart'
    });
  };

  hideCart = () => {
    const { cart } = this.refs;
    const { animationDuration } = this.props;

    anime({
      targets: cart,
      duration: animationDuration / 1.618 - 100 ,
      opacity: 0,
      elacticity: 100,
      timing: 'easeOutSine',
      complete: this.closeCart
    });
  };

  onSubmitQuantityProduct = index => e => {
    const { dispatch } = this.props;

    dispatch(changeProductQuantity(index, e.target.value));
    this.forceUpdate();
  };

  closeCart = () => {
    const { dispatch } = this.props;

    dispatch(closeCart());
  };

  deleteProduct = (index, name, quantityOrderedProducts) => () => {
    const { dispatch } = this.props;

    dispatch(
      deleteProductAndNotifyAbout(
        ...getDeleteProductArguments(index, name, quantityOrderedProducts)
      )
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const { quantityOrderedProducts } = this.props;
    const currentOrdredProductQuantity = prevState.cartProducts.length;

    if (currentOrdredProductQuantity !== quantityOrderedProducts) {
      this.renderOrderedProducts();
    }
  }

  render() {
    const { cartProducts } = this.state;
    const {
      closeButton,
      modifier,
      className,
      isShownHelpText,
      helpText,
      quantityOrderedProducts
    } = this.props;

    return (
      <Draggable disabled={!closeButton || window.innerWidth < 769}>
        <section
          ref="cart"
          style={{
            opacity: 0,
            transform: 'translate(0, -1.5rem)'
          }}
          className={getClass(
            composeClasses(
              'cart',
              '',
              modifier,
              'lowCascadingShadow ' + className ? className : ''
            )
          )}
        >
          {closeButton ? (
            <CloseButton {...closeButton}
              onClick={this.hideCart}
              label="Закрыть корзину"
            />
          ) : (
            ''
          )}
          <h2 className="visible-hidden">Корзина</h2>
          <p
            className={getClass({
              b: 'cart',
              el: 'hint',
              m: `${isShownHelpText ? 'shown' : ''}`,
              add: 'lowCascadingShadow'
            })}
          >
            {helpText}
          </p>
          <ul
            style={{
              backgroundImage: `url(${mesh})`
            }}
            className="orderedProducts parent row h-around"
          >
            {quantityOrderedProducts && Array.isArray(cartProducts) ? (
              cartProducts.map((product, index) => (
                <li key={index} className="orderedProducts__product baseChild">
                  <CartProduct
                    {...product}
                    deleteProduct={this.deleteProduct(
                      index,
                      product.name,
                      quantityOrderedProducts
                    )}
                    onSubmitQuantityProduct={this.onSubmitQuantityProduct(
                      index
                    )}
                  />
                </li>
              ))
            ) : (
              <p
                className={getClass({
                  b: 'cart',
                  el: 'hint',
                  m: 'empty'
                })}
              >
                Ваша корзина пуста, но вы всегда можете её пополнить ʕ•ᴥ•ʔ!
              </p>
            )}
          </ul>
        </section>
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;

  const { quantityOrderedProducts, isShownHelpText, helpText } = cart;

  return {
    quantityOrderedProducts,
    isShownHelpText,
    helpText
  };
};

export default withRouter(connect(mapStateToProps)(Cart));

// const Cart = ({
//   modifier='',
//   className,
//   cartProducts,
//   closeButton,
//   onSubmitQuantityProduct,
//   deleteProduct,
//   helpText,
//   isShownHelpText,
//   quantityOrderedProducts
// }) => (
//   <Draggable disabled={!closeButton || window.innerWidth < 769}>
//     <section className={getClass(composeClasses('cart', '', modifier, 'lowCascadingShadow ' + className))}
//     >
//       {closeButton ?
//         <CloseButton {...closeButton} label="Закрыть корзину" /> :
//         ''
//       }
//       <h2 className='visible-hidden'>
//         Корзина
//       </h2>
//       <p className={
//         getClass({
//           b: 'cart',
//           el: 'hint',
//           m: `${isShownHelpText ? 'shown' : ''}`,
//           add: 'lowCascadingShadow'
//         })}>
//         {helpText}
//       </p>
//       <ul
//         style={{
//           backgroundImage: `url(${mesh})`
//         }}
//         className='orderedProducts parent row h-around'>
//         {
//           quantityOrderedProducts &&
//           Array.isArray(cartProducts) ?
//             cartProducts.map((product, index) => (
//               <li key={index}
//                 className='orderedProducts__product baseChild'>
//                 <CartProduct {...product}
//                   deleteProduct={deleteProduct(index, product.name, quantityOrderedProducts)}
//                   onSubmitQuantityProduct={onSubmitQuantityProduct(index)}
//                 />
//               </li>
//             ))
//             : <p className={getClass({b: 'cart', el: 'hint', m: 'empty'})}>
//               Ваша корзина пуста, но вы всегда можете её пополнить ʕ•ᴥ•ʔ!
//             </p>
//         }
//       </ul>
//     </section>
//   </Draggable>
// );
//
//
//
// export default Cart;
