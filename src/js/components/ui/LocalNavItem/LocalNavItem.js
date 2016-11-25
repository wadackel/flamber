// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import Button from "../internal/Button";
import { ExternalLinkIcon } from "../../svg-icons/";

const b = bem("local-nav-item");

type Props = {
  className?: string;
  children: React$Element<any>;
  active: boolean;
  href: string;
  target?: string;
  onClick?: Function;
};

export default class LocalNavItem extends Component {
  props: Props;

  static defaultProps = {
    active: false
  };

  handleClick = (e: SyntheticMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.props.active && typeof this.props.onClick === "function") {
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
