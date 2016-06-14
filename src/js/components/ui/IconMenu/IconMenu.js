/* eslint-disable */
import assign from "object-assign";
import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import { Menu } from "../";

const b = bem("icon-menu");

export default class IconMenu extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.element,
    origin: PropTypes.shape({
      horizontal: PropTypes.oneOf(["right", "left"]),
      vertical: PropTypes.oneOf(["top", "middle", "bottom"])
    }),
    onChange: PropTypes.func
  };

  static defaultProps = {
    origin: {
      horizontal: "left",
      vertical: "top"
    },
    onChange: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    bindHandlers([
      "handleIconClick"
    ], this);
  }

  handleIconClick() {
    this.setState({ open: !this.state.open });
  }

  renderMenu() {
    const {
      children,
      origin
    } = this.props;

    const {
      open
    } = this.state;

    const cloneChildren = children.map((item, index) =>
      React.cloneElement(item, {
        key: item.text,
        className: b("item"),
        index
      })
    );

    const menuClassName = b("menu", {
      [`${origin.vertical}-${origin.horizontal}`]: true
    });

    // TODO: Implements `Popover` component
    return (
      <ReactCSSTransitionGroup
        transitionName="test"
      >
        {open &&
          <Menu className={menuClassName}>
            {cloneChildren}
          </Menu>
        }
      </ReactCSSTransitionGroup>
    );
  }

  render() {
    const {
      className,
      icon
    } = this.props;

    const {
      open
    } = this.state;

    const iconElement = React.cloneElement(icon, {
      className: b("icon"),
      onClick: this.handleIconClick
    });

    return (
      <div className={mergeClassNames(b({ open }), className)}>
        {iconElement}
        {this.renderMenu()}
      </div>
    );
  }
}
