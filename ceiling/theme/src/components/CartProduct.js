import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import CloseButton from './CloseButton';
import ChangeQuantityProductForm from './ChangeQuantityProductForm';
import RenderController from './RenderController';

const CartProduct = ({
	modifier='',
	children,
	button,
	className,
	cartProducts,
	image,
	onSubmitQuantityProduct,
	deleteProduct,
	name,
	quantity,
	...rest
}) => (
	<div style={{backgroundImage: image}}
		className={getClass(composeClasses("cartProduct", '', modifier, className))}
	>
		<CloseButton block="deleteProductButton"
			onClick={deleteProduct} />
		<h3 title={`${name} в количестве ${quantity}шт. `} className={getClass(composeClasses("cartProduct","name", '', ''))}>{name}</h3>
		<input 
			type="number" 
			max="1000" 
			min="1" 
			title="Количество продукта"
			value={quantity}
			onChange={onSubmitQuantityProduct} 
			className={getClass({b: "productController"})} 
		/>
	</div>
);


export default CartProduct;