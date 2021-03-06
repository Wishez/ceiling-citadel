import React from 'react';

export default class NavDot extends React.Component {
  render() {
    const { size, margin = 0 } = this.props;

    const styles = {
      height: `${size}px`,
      width: `${size}px`,
      marginRight: `${margin}px`
    };

    return (
      <div
        ref={el => { this.el = el; }}
        className={this.props.className}
        style={styles}
      />
    );
  }
}
