import React, { PropTypes } from "react";
import Switch from "../internal/Switch";

export default class Radio extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    checked: PropTypes.bool,
    onCheck: PropTypes.func
  };

  static defaultProps = {
    checked: false,
    onCheck: () => {}
  };

  render() {
    return <Switch
      baseClassName="radio"
      type="radio"
      {...this.props}
    />;
  }
}
