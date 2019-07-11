import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import getClass, { composeClasses } from "@/constants/classes";
import CloseButton from "./CloseButton";
import Button from "./Button";
import Characteristics from "./Catalog/Characteristics";
import { Link } from "react-router-dom";

import { showProductInfo } from "@/actions/cart";

class CartProduct extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    modifier: PropTypes.string,
    className: PropTypes.string,
    image: PropTypes.string,
    productIndex: PropTypes.number.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    length: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    thickness: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    url: PropTypes.string.isRequired
  };

  showProductInfo = () => {
    const {
      name,
      quantity,
      length,
      thickness,
      width,
      dispatch,
      productIndex,
      ...rest
    } = this.props;

    const productCharacteristics = {
      name,
      quantity,
      length,
      thickness,
      width,
      productIndex,
      ...rest
    };

    dispatch(
      showProductInfo(productCharacteristics)
    );
  };

  render() {
    const {
      modifier,
      className,
      image,
      deleteProduct,
      name,
      url
    } = this.props;

    return (
      <div
        style={{ backgroundImage: `url("${image}")` }}
        className={getClass(
          composeClasses("cartProduct", "", modifier, `parent centered ${className}`)
        )}
      >

        <h3 className='position_absolute cartProduct__name fullWidth parent centered text_centered'>
          {name}
        </h3>

        <Link
          to={url}
          className='productIndicator unstyledLink fullWidth lowCascadingShadow moreRefer moreRefer_product parent row centered zeroVerticalMargin background-color_white'
        >
          К образцу
        </Link>
        <Button
          onClick={this.showProductInfo}
          className="productIndicator sampleData parent row centered position_absolute background-color_white shadow_none"
          content="Показать информацию"
        />
        <CloseButton
          label="Удалить образец из корзины"
          block="deleteProductButton"
          onClick={deleteProduct}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps)(CartProduct));
