import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import HeaderContainer from './HeaderContainer';
import CallbackFormContainer from './CallbackFormContainer';
import OrderFormContainer from './OrderFormContainer';
import FooterContainer from './FooterContainer';
import MainRoutes from './MainRoutes';

// import Fading from './../components/Animation/Fading';
import getClass from './../constants/classes';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './../tests/cart';
import './../tests/app';
import './../tests/callback';
import './../tests/catalog';
import './../tests/search';
import './../tests/order';


// const Fade = ({ children, ...props }) => (
//   <CSSTransition
//     {...props}
//     timeout={{
//       enter: 500,
//       exit: 300
//     }}  
//     component="div"
//     classNames={{
//       enter: getClass({b: 'fading', m: "enter"}),
//       enterActive: getClass({b: 'fading', m: "enterActive"}),
//       leave: getClass({b: 'fading', m: "leave"}),
//       leaveActive: getClass({b: 'fading', m: "leaveActive"})
//     }}
//   >
//     {children}
//   </CSSTransition>
// );

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
        phone, email,
        address, addressHref } = this.props;

    return (
      <div>
        <HeaderContainer phone={phone} email={email} />
        <MainRoutes />
        <FooterContainer address={address} addressHref={addressHref}
          phone={phone} email={email} />
        {isCallbackOpened ? 
            <CallbackFormContainer /> : ''
         }
          
        {isOrderOpened ? 
          <OrderFormContainer /> : 
          ''
        }
            
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { callback, order, app } = state;

  const { isCallbackOpened } = callback;
  const { isOrderOpened } = order;
  const { phone, email, address, addressHref } = app;
  console.log(state);
  
  return {
    isCallbackOpened,
    isOrderOpened,
    phone, email,
    address, addressHref
  };
};

export default withRouter(connect(mapStateToProps)(App));