import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HeaderContainer from "./HeaderContainer";
import CallbackFormContainer from "./CallbackFormContainer";
import OrderFormContainer from "./OrderFormContainer";
import FooterContainer from "./FooterContainer";
import MainRoutes from "./MainRoutes";

import CartProductInfo  from "@/components/Cart/CartProductInfo";
import {fetchCatalogIfNeededAndDumpEntities} from "@/actions/catalog";

class App extends PureComponent {
  static propTypes = {
    isCallbackOpened: PropTypes.bool.isRequired,
    isProductInfoOpened: PropTypes.bool.isRequired,
    isOrderOpened: PropTypes.bool.isRequired,
    address: PropTypes.string,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    addressHref: PropTypes.string
  }

  componentDidMount() {
    this.props.onAppLoaded();
  }

  render() {
    const {
      isCallbackOpened,
      isOrderOpened,
      isProductInfoOpened,
      phone, email,
      address, addressHref
    } = this.props;

    return (
      <div>
        <HeaderContainer phone={phone} email={email} />
        <MainRoutes />
        <FooterContainer address={address} addressHref={addressHref}
          phone={phone} email={email} />

        {isCallbackOpened ? <CallbackFormContainer /> : ""}
        {isOrderOpened ? <OrderFormContainer /> : ""}
        {isProductInfoOpened ? <CartProductInfo /> : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { callback, order, app, cart } = state;
  const {isProductInfoOpened} = cart;
  const { isCallbackOpened } = callback;
  const { isOrderOpened } = order;
  const { phone, email, address, addressHref } = app;

  return {
    isCallbackOpened,
    isOrderOpened,
    isProductInfoOpened,
    phone, email,
    address, addressHref
  };
};

const mapDispatchToProps = dispatch => ({
  onAppLoaded: () => {
    dispatch(fetchCatalogIfNeededAndDumpEntities());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
