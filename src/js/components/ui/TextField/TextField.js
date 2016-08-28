import _ from "lodash";
import autoBind from "auto-bind";
import keycode from "keycode";
import React, { PropTypes } from "react";
import Textarea from "react-textarea-autosize";
import assign from "object-assign";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
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
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
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
    multiLine: false,
    onChange: () => {},
    onEnter: () => {},
    onBlur: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isFocused: false,
      hasValue: isValid(props.defaultValue) || isValid(props.value)
    };

    autoBind(this);
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

  handleKeyUp(e) {
    this.props.onKeyUp(e);

    if (keycode(e) === "esc") {
      this.blur();
    }
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

  select() {
    const { multiLine } = this.props;
    const { control } = this.refs;

    if (multiLine) {
      control.selectionStart = 0;
      control.selectionEnd = control.value.length;
    } else {
      control.select();
    }
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
      minRows,
      maxRows,
      onEnter, // eslint-disable-line no-unused-vars
      onKeyDown,
      onKeyUp, // eslint-disable-line no-unused-vars
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
      className: b("control", textModifier)(),
      onKeyUp: this.handleKeyUp,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      id,
      defaultValue,
      value,
      name,
      onKeyDown,
      onKeyPress
    };

    const textAreaProps = { ...commonProps };
    if (!_.isUndefined(rows)) textAreaProps.rows = rows;
    if (!_.isUndefined(minRows)) textAreaProps.minRows = minRows;
    if (!_.isUndefined(maxRows)) textAreaProps.maxRows = maxRows;
    if (!_.isUndefined(value)) textAreaProps.useCacheForDOMMeasurements = true;

    const inputProps = assign({}, commonProps, {
      onEnter: this.handleEnter,
      type
    });

    return (
      <div className={mergeClassNames(b(assign({}, modifier, { "has-label": !!label }))(), className)}>
        {label
          ? <div className={b("label", modifier)()}>{label}</div>
          : null
        }
        {placeholder
          ? <div className={b("placeholder", modifier)()}>{placeholder}</div>
          : null
        }
        {multiLine
          ? <Textarea ref="control" {...textAreaProps} />
          : <Input ref="control" {...inputProps} />
        }
      </div>
    );
  }
}
