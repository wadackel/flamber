// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("radio-group");

type Props = {
  children?: React$Element<any>;
  className?: string;
  name?: string;
  value?: any;
  onChange?: Function;
};

export default class RadioGroup extends Component {
  props: Props;

  handleCheck = (value: any, checked: boolean) => {
    if (checked && typeof this.props.onChange === "function") {
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

    const cloneChildren = React.Children.map(children, child =>
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
