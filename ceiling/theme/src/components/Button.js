import React, { Component } from 'react';
import getClass from '@/constants/classes';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    block: PropTypes.string,
    element: PropTypes.string,
    modifier: PropTypes.string,
    content: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    unstyled: PropTypes.bool
  };



  state = {
    isPressed: false
  };

  onClickButton = () => {
    const { isPressed } = this.state;
    const {onClick} = this.props;
    console.log(onClick);
    this.setState({
      isPressed: !isPressed
    });

    if (onClick) {
      onClick();
    }
  }

  onBlurButton = () => {
    const {onBlur} = this.props;

    this.setState({
      isPressed: false
    });

    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const {
      children,
      content,
      block,
      element,
      modifier,
      className,
      label,
      type,
      unstyled,
      ...rest
    } = this.props;
    const { isPressed } = this.state;

    return (
      <button
        aria-label={label}
        type={type ? type : 'button'}
        aria-pressed={isPressed}
        onClick={this.onClickButton}
        onBlur={this.onBlurButton}
        className={`${getClass({
          b: block,
          el: element,
          m: modifier,
          add: `${!unstyled ? 'button lowCascadingShadow ': ''} ${className ? className: ''}`
        })}`}
        {...rest}
      >
        {content}
        {children}
      </button>
    );
  }
}


export default Button;
