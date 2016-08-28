import autoBind from "auto-bind";
import keycode from "keycode";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { TextField } from "../";

const b = bem("editable-text");

export default class EditableText extends Component {
  static propTypes = {
    className: PropTypes.string,
    multiLine: PropTypes.bool,
    icon: PropTypes.element,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    multiLine: false,
    placeholder: "",
    onEnter: () => {},
    onKeyDown: () => {},
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

  handleKeyDown(e) {
    this.props.onKeyDown(e);

    if (this.props.multiLine && keycode(e) === "enter") {
      e.preventDefault();
      this._isEnter = true;
      this.props.onEnter(e, e.currentTarget.value);
      this.refs.textField.blur();
    }
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

  renderValue() {
    const { multiLine, value } = this.props;
    const regex = /(\n)/g;

    if (!multiLine) return value;

    return value.split(regex).map(line =>
      !line.match(regex) ? line : React.createElement("br")
    );
  }

  render() {
    const {
      className,
      multiLine,
      placeholder,
      icon,
      value,
      onEnter, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      onBlur, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const {
      isEditing,
      isHover
    } = this.state;

    const modifier = {
      "multi-line": multiLine,
      "is-editing": isEditing
    };

    const iconModifier = {
      ...modifier,
      show: !isEditing && isHover
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
        <span className={b("body", modifier)()}>
          <TextField
            ref="textField"
            multiLine={multiLine}
            className={b("text-field", modifier)()}
            value={value}
            onEnter={this.handleEnter}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...props}
          />
          <span className={b("text", modifier)()}>
            {this.renderValue()}
            {value === ""
              ? <span className={b("placeholder")()}>{placeholder}</span>
              : null
            }
            <span className={b("icon", iconModifier)()}>{icon}</span>
          </span>
        </span>
      </span>
    );
  }
}
