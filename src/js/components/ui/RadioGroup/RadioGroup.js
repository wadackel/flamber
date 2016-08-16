import autoBind from "auto-bind";
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("radio-group");

export default class RadioGroup extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleCheck(value, checked) {
    if (checked) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      children,
      className,
      name,
      value
    } = this.props;

    const cloneChildren = children.map(child =>
      React.cloneElement(child, {
        key: child.props.value,
        checked: value === child.props.value,
        onCheck: this.handleCheck,
        name
      })
    );

    return (
      <div className={mergeClassNames(b(), className)}>
        {cloneChildren}
      </div>
    );
  }
}
