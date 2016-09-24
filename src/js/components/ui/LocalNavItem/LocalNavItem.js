import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import Button from "../internal/Button";
import { ExternalLinkIcon } from "../../svg-icons/";

const b = bem("local-nav-item");

export default class LocalNavItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    active: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    active: false,
    onClick: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.props.active) {
      this.props.onClick(this.props.href, this.props.target);
    }
  }

  render() {
    const {
      className,
      children,
      active,
      target
    } = this.props;

    const modifier = { active };

    return (
      <li className={mergeClassNames(b(modifier)(), className)}>
        <Button
          baseClassName={b("button")()}
          className={active ? b("button--active")() : ""}
          label={children}
          iconRight={target === "_blank" ? <ExternalLinkIcon className={b("icon")()} /> : null}
          textAlign="left"
          disable={active}
          onClick={this.handleClick}
        />
      </li>
    );
  }
}
