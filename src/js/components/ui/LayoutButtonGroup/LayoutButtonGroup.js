import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("layout-button-group");

export default class LayoutButtonGroup extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
      "handleButtonClick"
    ], this);
  }

  handleButtonClick(value) {
    if (this.props.value !== value) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      children,
      className,
      value
    } = this.props;

    const cloneChildren = children.map(child =>
      React.cloneElement(child, {
        key: child.props.value,
        selected: child.props.value === value,
        onClick: this.handleButtonClick
      })
    );

    return (
      <div className={mergeClassNames(b(), className)}>
        {cloneChildren}
      </div>
    );
  }
}
