import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CallbackButton from "./../components/CallbackButton";

import {openCallback, reinitCallbackForm} from "./../actions/callback";

class CallbackButtonContainer extends PureComponent {
	 static propTypes = {
	    isCallbackOpened: PropTypes.bool.isRequired,
    	isShownHelpText: PropTypes.bool.isRequired,
    	helpText: PropTypes.string.isRequired,
	    modifier: PropTypes.string
  	}

	 render() {
	  return (
	     <CallbackButton {...this.props} />
	  );
	 }
}

const mapDispatchToProps = dispatch => ({
  openCallback: () => {
	  dispatch(reinitCallbackForm());
  	dispatch(openCallback());
  },
});

const mapStateToProps = state => {
  const { callback } = state;
  const { isCallbackOpened, isShownHelpText, helpText } = callback;
  return { isShownHelpText, helpText, isCallbackOpened };
};

export default connect(mapStateToProps, mapDispatchToProps)(CallbackButtonContainer);
