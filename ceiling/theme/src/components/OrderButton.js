import React from 'react';
import getClass from './../constants/classes';
import Button from './Button';
import colors from './../constants/colors';
import Cart from './Cart';

const OrderButton = ({
  openCart,
  closeCart,
  openOrder,
  quantityOrderedProducts,
  products,
  isCartOpened,
  cartModifier,
  modifier,
  className,
  ...rest
}) => (
  <div className={getClass({
    b: 'orderButtons',
    m: modifier,
    add: `parent parent_nowrap row h-between v-centered ${className ? className : ''}`
  })}>
  	<Button
      id='menuButton'
      className={getClass({
        b: 'orderButtons',
        el: 'button',
        m: modifier,
        add: 'button_darkBlue'
      })}
      onClick={openOrder}
      content="Оформить заказ"
      label="Открывает форму оформления заказа"
    />
    <button
      onClick={isCartOpened ?
        closeCart
        : openCart}
      aria-pressed={false}
      aria-label={!isCartOpened ?
        'Открывает корзину'
        : 'Закрывает корзину'}
      className='quantityOrderedProductsButton'>
      <svg width="2.8125em" height="2.8125em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">

        <path d="M128 0 L170 90 L256 100 L184 160 L210 256 L128 195 L52 256 L76 160 L0 100 L82 90 L128 0z" fill={colors.orange} strokeWidth="15" stroke={colors.darkGray}></path>
        <text x="100" y="165" style={{fontSize: '5em'}} fill={colors.white}>{quantityOrderedProducts}</text>
      </svg>
    </button>
    {isCartOpened ?
      <Cart {...rest}
        quantityOrderedProducts={quantityOrderedProducts}
        closeButton={{
          block: 'closeCart',
          onClick: closeCart
        }}
        modifier={cartModifier}
        cartProducts={products} />
      : ''}
  </div>

);


export default OrderButton;
