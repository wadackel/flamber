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
    onComplete: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    onEnter: () => {},
    onComplete: () => {},
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
      "handleEnter",
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

  handleEnter(e, value) {
    this.props.onEnter(e, value);
    this.refs.textField.blur();
  }

  handleBlur(e) {
    this.setState({ isEditing: false });
    this.props.onBlur(e);
    this.props.onComplete(e.target.value);
  }

  render() {
    const {
      className,
      icon,
      value,
      onEnter,
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
            onEnter={this.handleEnter}
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
