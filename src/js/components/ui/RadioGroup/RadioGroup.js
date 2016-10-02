// @flow
import autoBind from "auto-bind";
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
  static defaultProps = {
    onChange: () => {}
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleCheck(value: any, checked: boolean) {
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
