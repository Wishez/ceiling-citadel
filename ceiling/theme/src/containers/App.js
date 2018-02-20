import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderContainer from './HeaderContainer';
import CallbackFormContainer from './CallbackFormContainer';
import OrderFormContainer from './OrderFormContainer';
import FooterContainer from './FooterContainer';
import MainRoutes from './MainRoutes';
import getClass from './../constants/classes';
import {
  fetchCatalogIfNeededAndDumpEntities
} from './../actions/catalog';
import {localData} from './../constants/pureFunctions';

// import './../tests/cart';
// import './../tests/app';
// import './../tests/callback';
// import './../tests/catalog';
// import './../tests/search';
// import './../tests/order';



class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isCallbackOpened: PropTypes.bool.isRequired,
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCatalogIfNeededAndDumpEntities());
    this.forceUpdate(); 
    
  }

  render() {
    const { 
      isCallbackOpened, 
      isOrderOpened,
      phone, email,
      address, addressHref } = this.props;

    return (
      <div>
        <HeaderContainer phone={phone} email={email} />
        <MainRoutes />
        <FooterContainer address={address} addressHref={addressHref}
          phone={phone} email={email} />
        
        <CallbackFormContainer in={isCallbackOpened} /> : ''
          
       
        <OrderFormContainer in={isOrderOpened}/>
            
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { callback, order, app } = state;

  const { isCallbackOpened } = callback;
  const { isOrderOpened } = order;
  const { phone, email, address, addressHref } = app;
  
  return {
    isCallbackOpened,
    isOrderOpened,
    phone, email,
    address, addressHref
  };
};

export default withRouter(connect(mapStateToProps)(App));
