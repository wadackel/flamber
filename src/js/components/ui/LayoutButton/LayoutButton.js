// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { IconButton } from "../";
import type { TooltipPositions } from "../internal/Tooltip";

const b = bem("layout-button");

type Props = {
  className?: string;
  icon: React$Element<any>;
  tooltip?: string;
  tooltipOrigin?: TooltipPositions;
  value: any;
  selected?: boolean;
  onClick?: (value: any) => void;
};

export default class LayoutButton extends Component {
  props: Props;

  static defaultProps = {
    selected: false,
    onClick: () => {}
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleClick() {
    if (typeof this.props.onClick === "function") {
      this.props.onClick(this.props.value);
    }
  }

  render() {
    const {
      className,
      selected,
      value, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const modifier = { selected };

    return <IconButton
      className={mergeClassNames(b(modifier)(), className)}
      onClick={this.handleClick}
      {...props}
    />;
  }
}
