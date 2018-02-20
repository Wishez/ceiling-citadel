import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CallbackButton from './../components/CallbackButton';

import {openCallback} from './../actions/callback';

import { 
  getDeleteProductArguments, 
  slideTo 
} from './../constants/pureFunctions';

class CallbackButtonContainer extends Component {
	static propTypes = {
	    dispatch: PropTypes.func.isRequired,
	    isCallbackOpened: PropTypes.bool.isRequired,
    	isShownHelpText: PropTypes.bool.isRequired,
    	helpText: PropTypes.string.isRequired,
	    modifier: PropTypes.string
  	}

	openCallbackForm = () => { 
  	const { dispatch } = this.props;
  	dispatch(openCallback());
	  slideTo('.popupFormContainer__title');
	}

	render() {
	  return (
	    
	     <CallbackButton {...this.props}
	        openCallback={this.openCallbackForm} />
	    
	  );
	}
}

const mapStateToProps = state => {
  const { callback } = state;

  const { 
    isCallbackOpened, 
    isShownHelpText, 
    helpText 
  } = callback;

  return {
    isShownHelpText,
    helpText,
    isCallbackOpened
  };
};

export default connect(mapStateToProps)(CallbackButtonContainer);
