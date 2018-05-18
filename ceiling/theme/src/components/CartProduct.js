import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getClass, { composeClasses } from '@/constants/classes';
import CloseButton from './CloseButton';
import Button from './Button';
import Characteristics from './Catalog/Characteristics';
import { Link } from 'react-router-dom';

import { showProductInfo } from '@/actions/cart';

class CartProduct extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    modifier: PropTypes.string,
    className: PropTypes.string,
    image: PropTypes.string,
    onSubmitQuantityProduct: PropTypes.oneOfType([Number, String]).isRequired,
    deleteProduct: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([Number, String]).isRequired,
    width: PropTypes.oneOfType([Number, String]),
    length: PropTypes.oneOfType([Number, String]),
    thickness: PropTypes.oneOfType([Number, String]),
    url: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {}
  componentDidMount() {}
  getDerivedStateFromProps(nextProps, prevState) {}

  shouldComponentUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  getSnapshotBeforeUpdate(prevProps, prevState) {}

  componentWillUnmount() {}
  componentDidCatch(error, info) {}

  showProductInfo = () => {
    const {
      name,
      quantity,
      length,
      thickness,
      width,
      dispatch,
      ...rest
    } = this.props;

    dispatch(
      showProductInfo({
        name,
        quantity,
        length,
        thickness,
        width,
        ...rest
      })
    );
  };

  render() {
    const {
      modifier,
      className,
      image,
      onSubmitQuantityProduct,
      deleteProduct,
      name,
      quantity,
      width,
      length,
      thickness,
      url,
      ...rest
    } = this.props;

    return (
      <div
        style={{ backgroundImage: `url("${image}")` }}
        className={getClass(
          composeClasses('cartProduct', '', modifier, className)
        )}
      >
        <CloseButton
          label="Удалить продукт из корзины"
          block="deleteProductButton"
          onClick={deleteProduct}
        />
        <h3 className={getClass(composeClasses('cartProduct', 'name', '', ''))}>
          {name}
        </h3>

        <Link
          to={url}
          className={getClass({
            b: 'moreRefer',
            m: 'product',
            add: 'parent row centered zeroVerticalMargin'
          })}
        >
          К продукту
        </Link>
        <Button
          onClick={showProductInfo({
            name,
            quantity,
            length,
            thickness,
            width,
            ...rest
          })}
          className="sampleData"
          content="Показать информацию"
        />
        <input
          type="number"
          max="10000"
          min="1"
          title="Количество продукта"
          value={quantity}
          onChange={onSubmitQuantityProduct}
          className="productController"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default withRouter(connect(mapStateToProps)(CartProduct));
