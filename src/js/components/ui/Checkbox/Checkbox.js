/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("checkbox");

// TODO
export default class Checkbox extends React.Component {
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

  constructor(props) {
    super(props);

    this.state = {};

    bindHandlers([
      "handleChange"
    ], this);
  }

  handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onCheck(this.props.value);
  }

  render() {
    const {
      className,
      label,
      name,
      value,
      checked
    } = this.props;

    const modifier = {
      checked
    };

    return (
      <div className={mergeClassNames(b(modifier), className)}>
        <input
          ref="checkbox"
          type="checkbox"
          className={b("input", modifier)}
          name={name}
          value={value}
          onChange={this.handleChange}
        />
        <div className={b("body")}>
          <span className={b("checkbox", modifier)}></span>
          <span className={b("label", modifier)}>{label}</span>
        </div>
      </div>
    );
  }
}
