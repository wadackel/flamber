/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("menu");

export default class Menu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    open: PropTypes.bool
  };

  static defaultProps = {
    open: false
  };

  render() {
    const {
      className,
      children,
      open
    } = this.props;

    return (
      <div className={`${b()} ${className ? className : ""}`}>
        {children}
      </div>
    );
  }
}
