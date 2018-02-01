import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import CloseButton from './CloseButton';
import CartProduct from './CartProduct';
import mesh from './../images/cart/mesh.png';

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
	<section className={getClass(composeClasses("cart", '', modifier, className))}
	>	
		{closeButton ? 
			<CloseButton {...closeButton} /> :
			''
		}
		<h2 className={getClass({b: "visible-hidden"})}>Корзина</h2>
		<p className={getClass({b: "cart", el: "hint", m: `${isShownHelpText ? "shown" : ""}`})}>{helpText}</p>
		<ul style={{backgroundImage: `url(${mesh})` }} className={getClass({b: 'orderedProducts', add: "parent row h-around"})}>
		{quantityOrderedProducts ? 
			cartProducts.map((product, index) => (
			<li className={getClass({b: 'orderedProducts', el: "product", add: "baseChild"})} key={index}>
				<CartProduct {...product}
					deleteProduct={deleteProduct(index, product.name, quantityOrderedProducts)}
					onSubmitQuantityProduct={onSubmitQuantityProduct(index)}/>
			</li>
		)) :
		<p className={getClass({b: "cart", el: "hint", m: "empty"})}>Ваша корзина пуста, но вы всегда можете её пополнить ʕ•ᴥ•ʔ!</p>
		}
		</ul>
	</section>
);


export default Cart;