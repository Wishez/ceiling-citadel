import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import {
  tryOrderCallback,
  closeCallback,
  reinitCallbackForm
} from "@/actions/callback";

import Loader from "@/components/Loader";
import CallbackForm from "@/components/CallbackForm";
import PopupFormContainer from "@/components/PopupFormContainer";


class CallbackFormContainer extends PureComponent {
  static propTypes = {
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

    dispatch(reinitCallbackForm());
    dispatch(closeCallback());
  }


  render() {
    const { helpText, isOrderedCallback, isRequesting } = this.props;

    return (

      <PopupFormContainer
        closeButton={{
          onClick: this.onClickCloseButton
        }}
        signification="Консультация"
        {...this.props}>
        {!isOrderedCallback ?
          <CallbackForm
            buttonOptions={{
              content: !isRequesting ?
                "Заказать"
                : <Loader />,
            }}
            id="callbackForm"
            onSubmit={this.submitCallback}
            helpText={helpText.toString()}
          />
          : <p className='successfull'>
            {ReactHtmlParser(helpText)}
          </p>
        }
      </PopupFormContainer>

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
