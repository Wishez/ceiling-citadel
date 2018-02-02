import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import HeaderContainer from './HeaderContainer';
import CallbackFormContainer from './CallbackFormContainer';
import OrderFormContainer from './OrderFormContainer';
import FooterContainer from './FooterContainer';

import './../tests/cart';
import './../tests/app';
import './../tests/callback';
import './../tests/catalog';
import './../tests/search';
import './../tests/order';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isCallbackOpened: PropTypes.bool.isRequired,
  }
  componentDidMount() {
    
  }

  render() {
    const { 
        isCallbackOpened, 
        isOrderOpened,
        phone, email } = this.props;

    return (
      <div>
        <HeaderContainer phone={phone} email={email} />
        {isCallbackOpened ? 
            <CallbackFormContainer /> : ''
        }
        {isOrderOpened ? 
            <OrderFormContainer /> : ''
        }
        <FooterContainer phone={phone} email={email} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { callback, order, app } = state;

  const { isCallbackOpened } = callback;
  const { isOrderOpened } = order;

  
  const { phone, email } = app;
  return {
    isCallbackOpened,
    isOrderOpened,
    phone, email
  };
};

export default connect(mapStateToProps)(App);