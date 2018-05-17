import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import CloseButton from './CloseButton';
import ReactTooltip from 'react-tooltip';
import Characteristics from './Catalog/Characteristics';
import {Link} from 'react-router-dom';

const CartProduct = ({
  modifier='',
  className,
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
    className={
      getClass(composeClasses('cartProduct', '', modifier, className))
    }
    tabIndex="0"
    data-tip
    data-for={`orderedProduct_${index}`}
  >
    <CloseButton label="Удалить продукт из корзины" block="deleteProductButton"
      onClick={deleteProduct} />
    <h3 className={
      getClass(composeClasses('cartProduct','name', '', ''))
    }>
      {name}
    </h3>
    <ReactTooltip id={`orderedProduct_${index}`}>
      <h4>
        {name}
      </h4>
      <p>Количество: {quantity}шт.</p>

      {width && length ?
        <p>
				   	Квадратные метры: {width * length * quantity}²<br/>
        </p>
        : ''}

      <Characteristics width={width}
        length={length}
        thickness={thickness}
        modifier="static"
        {...rest} />

    </ReactTooltip>

    <Link to={url} className={getClass({
      b: 'moreRefer',
      m: 'product',
      add: 'parent row centered zeroVerticalMargin'
    })}>
      К продукту
    </Link>
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

export default CartProduct;
