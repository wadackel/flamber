// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("layout-button-group");

type Props = {
  children?: React$Element<any>;
  className?: string;
  value: any;
  onChange?: Function;
};

export default class LayoutButtonGroup extends React.Component {
  props: Props;

  handleButtonClick = (value: any) => {
    if (this.props.value !== value && typeof this.props.onChange === "function") {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      children,
      className,
      value
    } = this.props;

    const cloneChildren = React.Children.map(children, child =>
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
