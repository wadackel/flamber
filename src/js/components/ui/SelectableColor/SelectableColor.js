// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { CheckIcon } from "../../svg-icons/";

const b = bem("selectable-color");

type Props = {
  className?: string;
  style?: Object;
  color: string;
  selected: boolean;
  borderColor: string;
  checkMarkColor: string;
  onClick?: Function;
};

export default class SelectableColor extends Component {
  props: Props;

  static defaultProps = {
    selected: false,
    borderColor: "transparent",
    checkMarkColor: "#fff"
  };

  handleClick = (e: SyntheticMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof this.props.onClick === "function") {
      this.props.onClick(e, this.props.color);
    }
  }

  render() {
    const {
      className,
      style,
      color,
      selected,
      borderColor,
      checkMarkColor
    } = this.props;

    const modifier = { selected };
    const finalStyle = {
      ...style,
      borderColor,
      backgroundColor: color
    };

    return (
      <span
        className={mergeClassNames(b(modifier)(), className)}
        style={finalStyle}
        onClick={this.handleClick}
      >
        <CheckIcon
          className={b("check", modifier)()}
          style={{ fill: checkMarkColor }}
        />
      </span>
    );
  }
}
