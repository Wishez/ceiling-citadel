import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getClass from './../constants/classes';
import CallbackForm from './../components/CallbackForm';
import PopupFormContainer from './../components/PopupFormContainer';
import { 
  tryOrderCallback, 
  closeCallback 
} from './../actions/callback';

import Loader from './../components/Loader';
import ReactHtmlParser from 'react-html-parser';

import { TransitionGroup, CSSTransition } from 'react-transition-group'

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={{
      enter: 500,
      exit: 300
    }}  
    component="div"
    classNames={{
      enter: getClass({b: 'fading', m: "enter"}),
      enterActive: getClass({b: 'fading', m: "enterActive"}),
      leave: getClass({b: 'fading', m: "leave"}),
      leaveActive: getClass({b: 'fading', m: "leaveActive"})
    }}
  >
    {children}
  </CSSTransition>
);

class CallbackFormContainer extends Component {
  static propTypes = { 
      dispatch: PropTypes.func.isRequired,
      isCallbackOpened: PropTypes.bool.isRequired,
      helpText: PropTypes.string.isRequired,
      isShownHelpText: PropTypes.bool.isRequired,
      isOrderedCallback: PropTypes.bool.isRequired,
      isRequesting: PropTypes.bool.isRequired
  }

  submitCallback = (values, dispatch) => {

    dispatch(tryOrderCallback(values));
  }

  onClickCloseButton = () => {
    const { dispatch } = this.props;
    dispatch(closeCallback());
  }


  render() {
    const { helpText, isOrderedCallback, isRequesting } = this.props;

    return (
      <Fade>
      <PopupFormContainer  
        closeButton={{
          onClick: this.onClickCloseButton
        }} 
        signification="Консультация"
        {...this.props}>
        {!isOrderedCallback ? 
        <CallbackForm buttonOptions={{ 
          content: !isRequesting ? "Заказать" : <Loader />,
        }}
          onSubmit={this.submitCallback} 
          helpText={helpText.toString()}
          /> :
          <p className={getClass({b: "successfull"})}>{ReactHtmlParser(helpText)}</p>
        }

      </PopupFormContainer>
      </Fade>
    );
  }
}


const mapStateToProps = state => {
  const { callback } = state;
  
  return {
    ...callback
  };
};

export default connect(mapStateToProps)(CallbackFormContainer);