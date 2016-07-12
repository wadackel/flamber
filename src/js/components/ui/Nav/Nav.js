import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("nav");

export default class Nav extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    const {
      children,
      className
    } = this.props;

    return (
      <nav className={mergeClassNames(b(), className)}>
        <ul className={b("list")}>
          {children}
        </ul>
      </nav>
    );
  }
}
