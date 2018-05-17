import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import CloseButton from './CloseButton';
import CartProduct from './CartProduct';
import Draggable from 'react-draggable';

import mesh from '@/images/cart/mesh.png';


const Cart = ({
  modifier='',
  className,
  cartProducts,
  closeButton,
  onSubmitQuantityProduct,
  deleteProduct,
  helpText,
  isShownHelpText,
  quantityOrderedProducts
}) => (
  <Draggable disabled={!closeButton || window.innerWidth < 769}>
    <section className={getClass(composeClasses('cart', '', modifier, 'lowCascadingShadow ' + className))}
    >
      {closeButton ?
        <CloseButton {...closeButton} label="Закрыть корзину" /> :
        ''
      }
      <h2 className='visible-hidden'>
        Корзина
      </h2>
      <p className={
        getClass({
          b: 'cart',
          el: 'hint',
          m: `${isShownHelpText ? 'shown' : ''}`,
          add: 'lowCascadingShadow'
        })}>
        {helpText}
      </p>
      <ul
        style={{
          backgroundImage: `url(${mesh})`
        }}
        className='orderedProducts parent row h-around'>
        {
          quantityOrderedProducts &&
          Array.isArray(cartProducts) ?
            cartProducts.map((product, index) => (
              <li key={index}
                className='orderedProducts__product baseChild'>
                <CartProduct {...product}
                  deleteProduct={deleteProduct(index, product.name, quantityOrderedProducts)}
                  onSubmitQuantityProduct={onSubmitQuantityProduct(index)}
                  index={index}
                />
              </li>
            ))
            : <p className={getClass({b: 'cart', el: 'hint', m: 'empty'})}>
              Ваша корзина пуста, но вы всегда можете её пополнить ʕ•ᴥ•ʔ!
            </p>
        }
      </ul>
    </section>
  </Draggable>
);



export default Cart;
