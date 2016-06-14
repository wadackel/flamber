import React, { PropTypes } from "react";
import assign from "object-assign";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("text-field");

function isValid(value) {
  return !!(value || value === 0);
}

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
    this.setState({ hasValue: isValid(e.target.value) });
    this.props.onChange(e, e.target.value);
  }

  handleFocus(e) {
    this.setState({ isFocused: true });
    this.props.onFocus(e);
  }

  handleBlur(e) {
    this.setState({ isFocused: false });
    this.props.onBlur(e);
  }

  focus() {
    const { control } = this.refs;
    if (control) control.focus();
  }

  render() {
    const {
      className,
      id,
      type,
      defaultValue,
      label,
      placeholder,
      value,
      multiLine,
      rows,
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

    const textProps = {
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
          ? <textarea ref="control" {...textProps} rows={rows} />
          : <input ref="control" {...textProps} type={type} />
        }
      </div>
    );
  }
}
