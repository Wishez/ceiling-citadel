import React from 'react';
import getClass from './../constants/classes';
import Button from './Button';
import colors from './../constants/colors';

const OrderButton = ({
	showCart,
  closeCart,
  openOrder,
  quantityOrderedProducts,
  ...rest
}) => (
  <div className={getClass({
    b: "orderButtons",
    add: "parent row h-between v-center"
  })}>
  	<Button
      id='menuButton'
      className={`${getClass({
        b: "orderButtons",
        el: "button"
      })} ${getClass({
        b: "button",
        m: "darkBlue"
      })}`}
      onClick={openOrder}
      content="Оформить заказ" 
    />
    <svg width="45" height="45" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"> 
        
        <path d="M128 0 L170 90 L256 100 L184 160 L210 256 L128 195 L52 256 L76 160 L0 100 L82 90 L128 0z" fill={colors.orange} strokeWidth="15" stroke={colors.darkGray}></path>
        <text x="100" y="165" style={{fontSize: "6.5em"}} fill={colors.white}>{quantityOrderedProducts}</text>
    </svg>
  </div>
    
);


export default OrderButton;