/* eslint-disable */
import assign from "object-assign";
import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
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
    origin: OriginalPropTypes.origin,
    triggerOrigin: OriginalPropTypes.origin,
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
      open: false,
      triggerElement: null
    };

    bindHandlers([
      "handleIconClick",
      "handleRequestClose"
    ], this);
  }

  handleIconClick(e) {
    this.setState({
      open: true,
      triggerElement: e.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {
    const {
      children,
      className,
      icon,
      origin,
      triggerOrigin,
      onChange
    } = this.props;

    const {
      open,
      triggerElement
    } = this.state;

    const iconElement = React.cloneElement(icon, {
      className: b("icon"),
      onClick: this.handleIconClick,
      ref: "triggerElement"
    });

    // TODO
    const cloneChildren = children.map((item, index) =>
      React.cloneElement(item, {
        key: item.props.text,
        className: b("item"),
        onClick: () => console.log("ITEM"),
        index
      })
    );

    return (
      <div className={mergeClassNames(b({ open }), className)}>
        {iconElement}
        <Popover
          open={open}
          origin={origin}
          triggerOrigin={triggerOrigin}
          triggerElement={triggerElement}
          onRequestClose={this.handleRequestClose}
        >
          <Menu
            onChange={onChange}
          >
            {cloneChildren}
          </Menu>
        </Popover>
      </div>
    );
  }
}
