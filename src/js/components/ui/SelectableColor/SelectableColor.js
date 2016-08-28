import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { CheckIcon } from "../../svg-icons/";

const b = bem("selectable-color");

export default class SelectableColor extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    selected: PropTypes.bool,
    borderColor: PropTypes.string,
    checkMarkColor: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    style: {},
    selected: false,
    borderColor: "transparent",
    checkMarkColor: "#fff"
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClick(e, this.props.color);
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
