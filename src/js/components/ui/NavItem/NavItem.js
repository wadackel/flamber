import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import Button from "../internal/Button";

const b = bem("nav-item");

export default class NavItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    active: false
  };

  render() {
    const {
      children,
      className,
      active,
      ...props
    } = this.props;

    return (
      <li className={mergeClassNames(b({ active })(), className)}>
        <Button
          baseClassName={b("button")()}
          className={active ? b("button--active")() : ""}
          label={children}
          {...props}
        />
      </li>
    );
  }
}
