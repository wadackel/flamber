// @flow
import autoBind from "auto-bind";
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("checkbox-group");

type Props = {
  children: React$Element<any>;
  className?: string;
  name?: string;
  value: Array<any>;
  onChange?: Function;
};

export default class CheckboxGroup extends React.Component {
  props: Props;

  static defaultProps = {
    value: [],
    onChange: () => {}
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleCheck(value: any, checked: boolean) {
    let newValue = [];

    if (checked) {
      newValue = this.props.value.concat(value);
    } else {
      newValue = this.props.value.filter(val => val !== value);
    }

    if (typeof this.props.onChange === "function") {
      this.props.onChange(newValue);
    }
  }

  render() {
    const {
      children,
      className,
      name,
      value
    } = this.props;

    const cloneChildren = React.Children.map(children, child =>
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
