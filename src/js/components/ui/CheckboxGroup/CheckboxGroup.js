import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("checkbox-group");

export default class CheckboxGroup extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: [],
    onChange: () => {}
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
      "handleCheck"
    ], this);
  }

  handleCheck(value, checked) {
    let newValue = [];

    if (checked) {
      newValue = this.props.value.concat(value);
    } else {
      newValue = this.props.value.filter(val => val !== value);
    }

    this.props.onChange(newValue);
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
        checked: value.indexOf(child.props.value) >= 0,
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
