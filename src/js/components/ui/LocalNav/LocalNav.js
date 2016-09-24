import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("local-nav");

export default class LocalNav extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    href: PropTypes.string,
    onItemClick: PropTypes.func
  };

  static defaultProps = {
    onItemClick: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleItemClick(href, target) {
    this.props.onItemClick(href, target);
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
          {children.map(item =>
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
