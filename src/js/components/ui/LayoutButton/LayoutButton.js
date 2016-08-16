import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import { IconButton } from "../";

const b = bem("layout-button");

export default class LayoutButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.element,
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

    bindHandlers([
      "handleClick"
    ], this);
  }

  handleClick() {
    this.props.onClick(this.props.value);
  }

  render() {
    const {
      className,
      icon,
      selected
    } = this.props;

    const modifier = { selected };

    return <IconButton
      className={mergeClassNames(b(modifier)(), className)}
      icon={icon}
      onClick={this.handleClick}
    />;
  }
}
