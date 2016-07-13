/* eslint-disable */
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import { TextField } from "../";

const b = bem("editable-text");

export default class EditableText extends Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onBlur: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isHover: false
    };

    bindHandlers([
      "handleClick",
      "handleMouseEnter",
      "handleMouseLeave",
      "handleChange",
      "handleBlur"
    ], this);
  }

  handleClick() {
    this.setState({ isEditing: true }, () => {
      this.refs.textField.focus();
    });
  }

  handleMouseEnter() {
    this.setState({ isHover: true });
    this.props.onMouseEnter();
  }

  handleMouseLeave() {
    this.setState({ isHover: false });
    this.props.onMouseLeave();
  }

  handleChange(e, value) {
    this.props.onChange(e, value);
  }

  handleBlur(e) {
    this.setState({ isEditing: false });
    this.props.onBlur(e);
  }

  render() {
    const {
      className,
      icon,
      value,
      onBlur,
      ...props
    } = this.props;

    const {
      isEditing,
      isHover
    } = this.state;

    const modifier = {
      "is-editing": isEditing
    };

    return (
      <div
        className={mergeClassNames(b(modifier), className)}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={b("body")}>
          <span className={b("icon", { "show": !isEditing && isHover })}>{icon}</span>
          <TextField
            ref="textField"
            className={b("text-field", modifier)}
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            {...props}
          />
          <span className={b("text", modifier)}>
            {value}
          </span>
        </div>
      </div>
    );
  }
}
