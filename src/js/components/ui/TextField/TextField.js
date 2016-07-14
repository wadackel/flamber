import React, { PropTypes } from "react";
import assign from "object-assign";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import { isValid } from "../../../helpers/validate";
import Input from "../internal/Input";

const b = bem("text-field");

export default class TextField extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    multiLine: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func
  };

  static defaultProps = {
    id: "",
    type: "text",
    rows: 1,
    multiLine: false,
    onChange: () => {},
    onEnter: () => {},
    onBlur: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      hasValue: isValid(props.defaultValue) || isValid(props.value)
    };

    bindHandlers([
      "handleChange",
      "handleEnter",
      "handleFocus",
      "handleBlur"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty("value")) {
      const hasValue = isValid(nextProps.value);
      if (hasValue !== this.state.hasValue) {
        this.setState({ hasValue });
      }
    }
  }

  handleChange(e) {
    this.updateStateValue(e.target.value);
    this.props.onChange(e, e.target.value);
  }

  handleEnter(e) {
    this.updateStateValue(e.target.value);
    this.props.onEnter(e, e.target.value);
  }

  handleFocus(e) {
    this.setState({ isFocused: true });
    this.props.onFocus(e);
  }

  handleBlur(e) {
    this.setState({ isFocused: false });
    this.props.onBlur(e);
  }

  updateStateValue(value) {
    this.setState({ hasValue: isValid(value) });
  }

  focus() {
    const { control } = this.refs;
    if (control) control.focus();
  }

  blur() {
    const { control } = this.refs;
    if (control) control.blur();
  }

  render() {
    const {
      className,
      id,
      type,
      name,
      defaultValue,
      label,
      placeholder,
      value,
      multiLine,
      rows,
      onEnter, // eslint-disable-line no-unused-vars
      onKeyDown,
      onKeyUp,
      onKeyPress
    } = this.props;

    const {
      isFocused,
      hasValue
    } = this.state;

    const modifier = {
      "is-focused": isFocused,
      "has-value": hasValue
    };

    const textModifier = assign({}, modifier, {
      type: multiLine ? "multi-line" : type
    });

    const commonProps = {
      className: b("control", textModifier),
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      id,
      defaultValue,
      value,
      name,
      onKeyDown,
      onKeyUp,
      onKeyPress
    };

    const textAreaProps = assign({}, commonProps, {
      rows
    });

    const inputProps = assign({}, textAreaProps, {
      onEnter: this.handleEnter,
      type
    });

    return (
      <div className={mergeClassNames(b(assign({}, modifier, { "has-label": !!label })), className)}>
        {label
          ? <div className={b("label", modifier)}>{label}</div>
          : null
        }
        {placeholder
          ? <div className={b("placeholder", modifier)}>{placeholder}</div>
          : null
        }
        {multiLine
          ? <textarea ref="control" {...textAreaProps} />
          : <Input ref="control" {...inputProps} />
        }
      </div>
    );
  }
}
