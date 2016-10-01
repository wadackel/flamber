// @flow
import _ from "lodash";
import autoBind from "auto-bind";
import keycode from "keycode";
import React from "react";
import Textarea from "react-textarea-autosize";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { isValid } from "../../../helpers/validate";
import Input from "../internal/Input";

const b = bem("text-field");

type Props = {
  className?: string;
  id?: string;
  type: string;
  name?: string;
  defaultValue?: any;
  value?: any;
  label?: string;
  placeholder?: string;
  error?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  multiLine: boolean;
  onChange?: Function;
  onEnter?: Function;
  onFocus?: Function;
  onBlur?: Function;
  onKeyDown?: Function;
  onKeyPress?: Function;
  onKeyUp?: Function;
};

type State = {
  isFocused: boolean;
  hasValue: boolean;
};

export default class TextField extends React.Component {
  props: Props;
  state: State;

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

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      isFocused: false,
      hasValue: isValid(props.defaultValue) || isValid(props.value)
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.hasOwnProperty("value")) {
      const hasValue = isValid(nextProps.value);
      if (hasValue !== this.state.hasValue) {
        this.setState({ hasValue });
      }
    }
  }

  handleChange(e: SyntheticInputEvent) {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      this.updateStateValue(target.value);

      if (typeof this.props.onChange === "function") {
        this.props.onChange(e, target.value);
      }
    }
  }

  handleEnter(e: SyntheticInputEvent) {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      this.updateStateValue(target.value);

      if (typeof this.props.onEnter === "function") {
        this.props.onEnter(e, target.value);
      }
    }
  }

  handleKeyUp(e: SyntheticKeyboardEvent) {
    if (typeof this.props.onKeyUp === "function") {
      this.props.onKeyUp(e);
    }

    if (keycode(e) === "esc") {
      this.blur();
    }
  }

  handleFocus(e: SyntheticFocusEvent) {
    this.setState({ isFocused: true });
    if (typeof this.props.onFocus === "function") {
      this.props.onFocus(e);
    }
  }

  handleBlur(e: SyntheticFocusEvent) {
    this.setState({ isFocused: false });
    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(e);
    }
  }

  updateStateValue(value: any): void {
    this.setState({ hasValue: isValid(value) });
  }

  focus(): void {
    const { control } = this.refs;
    if (control) control.focus();
  }

  blur(): void {
    const { control } = this.refs;
    if (control) control.blur();
  }

  select(): void {
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
      error,
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
      "has-error": !!error,
      "has-value": hasValue
    };

    const textModifier = {
      ...modifier,
      type: multiLine ? "multi-line" : type
    };

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

    const inputProps = {
      ...commonProps,
      onEnter: this.handleEnter,
      type
    };

    return (
      <div className={mergeClassNames(b({ ...modifier, "has-label": !!label })(), className)}>
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
        {error
          ? <div className={b("error", modifier)()}>{error}</div>
          : null
        }
      </div>
    );
  }
}
