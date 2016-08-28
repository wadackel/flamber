/* eslint-disable */
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { IconButton } from "../";
import { CheckIcon } from "../../svg-icons/";

const b = bem("selectable-color-group");

export default class SelectableColorGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    selectColors: PropTypes.arrayOf(PropTypes.string),
    onColorClick: PropTypes.func
  };

  static defaultProps = {
    selectColors: [],
    onColorClick: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleColorClick(e, color) {
    this.props.onColorClick(color);
  }

  render() {
    const {
      children,
      className,
      selectColors
    } = this.props;

    return (
      <div className={mergeClassNames(b(), className)}>
        {React.Children.map(children, child =>
          <div className={b("color")()}>
            {React.cloneElement(child, {
              className: b("color")(),
              selected: selectColors.indexOf(child.props.color) > -1,
              onClick: this.handleColorClick
            })}
          </div>
        )}
      </div>
    );
  }
}
