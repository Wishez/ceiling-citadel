
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import getClass, { composeClasses } from "./../constants/classes";
import CloseButton from "./CloseButton";

class PopupFormContainer extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    block: PropTypes.string,
    modifier: PropTypes.string,
    className: PropTypes.string,
    closeButton: PropTypes.object.isRequired,
    signification: PropTypes.string.isRequired,
    animationDuration: PropTypes.number,
  };

  static defaultProps = {
    animationDuration: 300,
    block: "popupFormContainer"
  }

  componentDidMount() {
    this.showPopup();
  }

  showPopup = () => {
    const {popupBackground} = this.refs;
    const {animationDuration} = this.props;

    anime({
      targets: popupBackground,
      duration: animationDuration,
      opacity: 1,
      elacticity: 100,
      timing: "easeOutSine"
    });
  }

  hidePopup = () => {
    const {popupBackground} = this.refs;
    const {closeButton, animationDuration } = this.props;
    const {onClick: complete}  = closeButton;

    anime({
      targets: popupBackground,
      duration: animationDuration ,
      opacity: 0,
      elacticity: 100,
      timing: "easeInOutQuart",
      complete
    });
  }

  render() {
    const {
      block,
      modifier,
      className,
      closeButton,
      children,
      signification
    } = this.props;

    return (
      <div
        ref="popupBackground"
        style={{
          opacity: 0
        }}
        className="popupBackground parent row h-centered"
      >
        <section
          className={getClass(
            composeClasses(
              block,
              modifier,
              `popupFormContainer ${className ? className : ""}`
            )
          )}
        >
          <h2
            className={getClass({
              b: block,
              el: "title",
              add: "popupFormContainer__titleupper "
            })}
          >
            {signification}
          </h2>
          <CloseButton
            {...closeButton}
            label="Закрыть всплывающую форму"
            onClick={this.hidePopup}
          />
          {children}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default withRouter(connect(mapStateToProps)(PopupFormContainer));
