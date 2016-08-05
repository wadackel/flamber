import React, { PropTypes } from "react";
import Switch from "../internal/Switch";

export default class Checkbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onCheck: PropTypes.func
  };

  static defaultProps = {
    checked: false,
    indeterminate: false,
    onCheck: () => {}
  };

  render() {
    return <Switch
      baseClassName="checkbox"
      type="checkbox"
      {...this.props}
    />;
  }
}
