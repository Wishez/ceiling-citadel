import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Rodal from "rodal";
import Characteristics from './Catalog/Characteristics';

import {hideProductInfo} from '@/actions/cart';

class CartProductInfo extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([Number, String]).isRequired,
    length: PropTypes.oneOfType([Number, String]).isRequired,
    thickness: PropTypes.oneOfType([Number, String]).isRequired,
    width: PropTypes.oneOfType([Number, String]).isRequired,
    isProductInfoOpened: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  hideProductInfo = () => {
    const {dispatch} = this.props;

    dispatch(hideProductInfo())
  }

  componentWillMount() {}
  componentDidMount() {}

  render() {
    const {
      isProductInfoShown,
      name,
      quantity,
      length,
      thickness,
      width,
      ...rest
    } = this.props;

    return (
      <Rodal visible={isProductInfoShown}
        onClose={this.hideProductInfo}>
        <h4>{name}</h4>
        <p>Количество: {quantity}шт.</p>

        {width && length ? (
          <p>
            Квадратные метры: {width * length * quantity}²<br />
          </p>
        ) : (
          ""
        )}

        <Characteristics
          width={width}
          length={length}
          thickness={thickness}
          modifier="static"
          {...rest}
        />
      </Rodal>
    );
  }
}

const mapStateToProps = state => {
  const { cart } = state;

  const { productModalInfo, isProductInfoOpened} = cart;
  const { name, quantity, length, thickness, width, ...rest } = productModalInfo;

  return {
    name,
    quantity,
    length,
    thickness,
    width,
    isProductInfoOpened,
    ...rest
  };
};

export default withRouter(connect(mapStateToProps)(CartProductInfo));
