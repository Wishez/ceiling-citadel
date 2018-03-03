import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import CloseButton from './CloseButton';
import CartProduct from './CartProduct';
import mesh from './../images/cart/mesh.png';
import Draggable from 'react-draggable';

const Cart = ({
  modifier='',
  children,
  button,
  className,
  cartProducts,
  closeButton,
  onSubmitQuantityProduct,
  deleteProduct,
  helpText,
  isShownHelpText,
  quantityOrderedProducts,
  ...rest
}) => (
  <Draggable disabled={!closeButton}>
    <section className={getClass(composeClasses('cart', '', modifier, 'lowCascadingShadow ' + className))}
    >	
      {closeButton ? 
        <CloseButton {...closeButton} label="Закрыть корзину" /> :
        ''
      }
      <h2 className={getClass({b: 'visible-hidden'})}>Корзина</h2>
      <p className={getClass({b: 'cart', el: 'hint', m: `${isShownHelpText ? 'shown' : ''}`, add: 'lowCascadingShadow'})}>{helpText}</p>
      <ul style={{backgroundImage: `url(${mesh})` }} className={getClass({b: 'orderedProducts', add: 'parent row h-around'})}>
        {quantityOrderedProducts ? 
          cartProducts.map((product, index) => (
            <li className={getClass({b: 'orderedProducts', el: 'product', add: 'baseChild'})} key={index}>
              <CartProduct {...product}
                deleteProduct={deleteProduct(index, product.name, quantityOrderedProducts)}
                onSubmitQuantityProduct={onSubmitQuantityProduct(index)} 
                index={index}
              />
            </li>
          )) :
          <p className={getClass({b: 'cart', el: 'hint', m: 'empty'})}>Ваша корзина пуста, но вы всегда можете её пополнить ʕ•ᴥ•ʔ!</p>
        }
      </ul>
    </section>
  </Draggable>
);


export default Cart;
