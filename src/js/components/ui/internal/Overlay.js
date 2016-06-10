import React, { PropTypes } from "react";
import Portal from "../internal/Portal";
import bem from "../../../helpers/bem";

const b = bem("overlay");

export default class Overlay extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    className: PropTypes.string,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    open: false,
    onRequestClose: () => {}
  };

  render() {
    const {
      children,
      open,
      className,
      onRequestClose
    } = this.props;

    const baseClassName = b({ open });

    return (
      <Portal
        className={`${baseClassName} ${className ? className : ""}`}
        open={open}
        onRequestClose={onRequestClose}
      >
        {children}
      </Portal>
    );
  }
}
