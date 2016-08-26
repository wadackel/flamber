import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { TextField } from "../";

const b = bem("editable-text");

export default class EditableText extends Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node,
    value: PropTypes.string,
    onEnter: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    onEnter: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditing: false,
      isHover: false
    };

    this._isEnter = false;

    autoBind(this);
  }

  handleClick() {
    this.setState({ isEditing: true }, () => {
      this.refs.textField.focus();
      this.refs.textField.select();
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
    this._isEnter = true;
    this.props.onEnter(e, value);
    this.refs.textField.blur();
  }

  handleElementFocus() {
    this.setState({ isEditing: true }, () => {
      this.refs.textField.focus();
      this.refs.textField.select();
    });
  }

  handleBlur(e) {
    this.setState({ isEditing: false });
    this.props.onBlur(e, this._isEnter);
    this._isEnter = false;
  }

  render() {
    const {
      className,
      icon,
      value,
      onEnter, // eslint-disable-line no-unused-vars
      onBlur, // eslint-disable-line no-unused-vars
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
      <span
        className={mergeClassNames(b(modifier)(), className)}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleElementFocus}
        tabIndex="0"
      >
        <span className={b("body")()}>
          <span className={b("icon", { show: !isEditing && isHover })()}>{icon}</span>
          <TextField
            ref="textField"
            className={b("text-field", modifier)()}
            value={value}
            onEnter={this.handleEnter}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...props}
          />
          <span className={b("text", modifier)()}>
            {value}
          </span>
        </span>
      </span>
    );
  }
}
