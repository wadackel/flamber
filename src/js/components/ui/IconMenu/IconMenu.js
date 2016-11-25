// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Popover, Menu, MenuItem } from "../";
import type { Origin } from "../../../types/prop-types";

const b = bem("icon-menu");

type Props = {
  children?: React$Element<any>;
  className?: string;
  icon: React$Element<any>;
  origin: Origin;
  triggerOrigin: Origin;
  tooltip?: string;
  tooltipOrigin: Origin;
  onChange?: Function;
  onItemClick?: Function;
};

type State = {
  open: boolean;
  triggerElement: ?HTMLElement;
};

export default class IconMenu extends React.Component {
  props: Props;
  state: State = {
    open: false,
    triggerElement: null
  };

  static defaultProps = {
    origin: {
      vertical: "top",
      horizontal: "left"
    },
    triggerOrigin: {
      vertical: "top",
      horizontal: "left"
    }
  };

  handleIconClick = (e: SyntheticMouseEvent) => {
    this.setState({
      open: true,
      triggerElement: e.currentTarget instanceof HTMLElement ? e.currentTarget : null
    });
  }

  handleItemClick = (menuItem: MenuItem, value: any, index: number) => {
    this.setState({ open: false });
    if (typeof this.props.onItemClick === "function") {
      this.props.onItemClick(menuItem, value, index);
    }
  }

  handleRequestClose = () => {
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
      className: b("icon")(),
      onClick: this.handleIconClick,
      tooltip,
      tooltipOrigin
    });

    return (
      <div className={mergeClassNames(b({ open })(), className)}>
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
