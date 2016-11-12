// @flow
import autoBind from "auto-bind";
import keycode from "keycode";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import nl2br from "../../../utils/react-nl2br";
import { TextField } from "../";

const b = bem("editable-text");

export type EditableTextProps = {
  className?: string;
  multiLine: boolean;
  icon?: React$Element<any>;
  placeholder?: string;
  value?: string;
  onEnter?: Function;
  onKeyDown?: Function;
  onMouseEnter?: Function;
  onMouseLeave?: Function;
  onFocus?: Function;
  onBlur?: Function;
};

type State = {
  isEditing: boolean;
  isHover: boolean;
};

export default class EditableText extends Component {
  props: EditableTextProps;
  state: State;

  static defaultProps = {
    multiLine: false,
    placeholder: ""
  };

  _isEnter: boolean = false;

  constructor(props: EditableTextProps, context: Object) {
    super(props, context);

    this.state = {
      isEditing: false,
      isHover: false
    };

    autoBind(this);
  }

  handleClick() {
    this.setState({ isEditing: true }, () => {
      this.refs.textField.focus();
      this.refs.textField.select();
    });
  }

  handleMouseEnter(e: SyntheticMouseEvent) {
    this.setState({ isHover: true });
    if (typeof this.props.onMouseEnter === "function") {
      this.props.onMouseEnter(e);
    }
  }

  handleMouseLeave(e: SyntheticMouseEvent) {
    this.setState({ isHover: false });
    if (typeof this.props.onMouseLeave === "function") {
      this.props.onMouseLeave(e);
    }
  }

  handleEnter(e: SyntheticKeyboardEvent, value: any) {
    this._isEnter = true;
    this.triggerEnter(e, value);
    this.refs.textField.blur();
  }

  handleKeyDown(e: SyntheticKeyboardEvent) {
    if (typeof this.props.onKeyDown === "function") {
      this.props.onKeyDown(e);
    }

    if (this.props.multiLine && (keycode(e) === "enter" && !e.shiftKey)) {
      e.preventDefault();

      const value = typeof e.currentTarget.value === "string" ? e.currentTarget.value : "";

      this._isEnter = true;
      this.triggerEnter(e, value);
      this.refs.textField.blur();
    }
  }

  handleElementFocus(e: SyntheticFocusEvent) {
    this.setState({ isEditing: true }, () => {
      this.refs.textField.focus();
      this.refs.textField.select(e);
    });
  }

  handleBlur(e: SyntheticFocusEvent) {
    this.setState({ isEditing: false });

    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(e, this._isEnter);
    }

    this._isEnter = false;
  }

  triggerEnter(e: SyntheticKeyboardEvent, value: any) {
    if (typeof this.props.onEnter === "function") {
      this.props.onEnter(e, value);
    }
  }

  renderValue(): ?any {
    const { multiLine, value } = this.props;

    if (!multiLine) return value;
    if (!value) return null;

    return nl2br(value);
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
