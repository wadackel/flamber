// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("local-nav");

type Props = {
  className?: string;
  children?: React$Element<any>;
  style?: Object;
  href?: string;
  onItemClick?: Function;
};

export default class LocalNav extends Component {
  props: Props;

  handleItemClick = (href: string, target: string) => {
    if (typeof this.props.onItemClick === "function") {
      this.props.onItemClick(href, target);
    }
  }

  render() {
    const {
      className,
      children,
      style,
      href
    } = this.props;

    return (
      <nav
        className={mergeClassNames(b(), className)}
        style={style}
      >
        <ul className={b("list")()}>
          {React.Children.map(children, item =>
            React.cloneElement(item, {
              key: item.props.href,
              active: item.props.href === href,
              onClick: this.handleItemClick
            })
          )}
        </ul>
      </nav>
    );
  }
}
