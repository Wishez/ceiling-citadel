import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import CloseButton from './CloseButton';
import RenderController from './RenderController';
import ReactTooltip from 'react-tooltip';
import Characteristics from './Catalog/Characteristics';
import Characteristic from './Catalog/Characteristic';

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
  width,
  length,
  thickness,
  index,
  url,
  ...rest
}) => (
  <div style={{backgroundImage: `url("${image}")`}}
    className={getClass(composeClasses('cartProduct', '', modifier, className))}
    data-tip data-for={`orderedProduct_${index}`}
  >
    <CloseButton label="Удалить продукт из корзины" block="deleteProductButton"
      onClick={deleteProduct} />
			
    <h3 className={getClass(composeClasses('cartProduct','name', '', ''))}>{name}</h3>
    <ReactTooltip id={`orderedProduct_${index}`}>
      <h4>{name}</h4>
      <p>Количество: {quantity}шт.</p>
      {width && length ? 
        <p>
				   	Квадратные метры: {width * length * quantity}²<br/>
        </p> : ''}
      <Characteristics width={width}
        length={length}
        thickness={thickness}
        modifier="static"
        {...rest}>

      </Characteristics>
    </ReactTooltip>
    <a href={url} className={getClass({
      b: 'moreRefer',
      m: 'product',
      add: 'parent row centered zeroVerticalMargin'
    })}>Подробнее</a>
    <input 
      type="number" 
      max="10000" 
      min="1" 
      title="Количество продукта"
      value={quantity}
      onChange={onSubmitQuantityProduct} 
      className={getClass({b: 'productController'})} 
    />
  </div>
);
// </Tooltip>
// <Tooltip autoOpen={true}
// content={`${name} в количестве ${quantity}шт. - ${width * height * quantity} квадратных метров.`}>
export default CartProduct;
