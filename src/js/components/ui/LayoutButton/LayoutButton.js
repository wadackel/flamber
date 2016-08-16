import autoBind from "auto-bind";
import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { IconButton } from "../";

const b = bem("layout-button");

export default class LayoutButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.element,
    tooltip: PropTypes.string,
    tooltipOrigin: OriginalPropTypes.origin,
    value: PropTypes.any,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    selected: false,
    onClick: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleClick() {
    this.props.onClick(this.props.value);
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
