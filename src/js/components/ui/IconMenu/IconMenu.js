import React, { PropTypes } from "react";
import { findDOMNode } from "react-dom";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import { Popover, Menu } from "../";

const b = bem("icon-menu");

export default class IconMenu extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.element,
    tooltip: PropTypes.string,
    tooltipOrigin: OriginalPropTypes.origin,
    open: PropTypes.bool,
    origin: OriginalPropTypes.origin,
    triggerOrigin: OriginalPropTypes.origin,
    onChange: PropTypes.func,
    onItemClick: PropTypes.func
  };

  static defaultProps = {
    open: false,
    origin: {
      vertical: "top",
      horizontal: "left"
    },
    triggerOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    onChange: () => {},
    onItemClick: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      triggerElement: null
    };

    bindHandlers([
      "handleIconClick",
      "handleItemClick",
      "handleRequestClose"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({
        open: nextProps.open,
        triggerElement: findDOMNode(this.refs.triggerElement)
      });
    }
  }

  handleIconClick(e) {
    this.setState({
      open: true,
      triggerElement: e.currentTarget
    });
  }

  handleItemClick(menuItem, value, index) {
    this.setState({ open: false });
    this.props.onItemClick(menuItem, value, index);
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
      tooltip,
      tooltipOrigin,
      triggerOrigin,
      onChange
    } = this.props;

    const {
      open,
      triggerElement
    } = this.state;

    const iconElement = React.cloneElement(icon, {
      ref: "triggerElement",
      className: b("icon"),
      onClick: this.handleIconClick,
      tooltip,
      tooltipOrigin
    });

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
            onItemClick={this.handleItemClick}
          >
            {children}
          </Menu>
        </Popover>
      </div>
    );
  }
}
