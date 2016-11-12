// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { EditableText } from "../";
import type { EditableTextProps } from "../EditableText/EditableText";

const b = bem("cancelable-edit-text");

type Props = $All<EditableTextProps, {
  onComplete?: Function;
}>;

type State = {
  value: ?string;
};

export default class CancelableEditText extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    value: ""
  };

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = { value: props.value };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleBlur(e: SyntheticFocusEvent, isEnter: boolean) {
    if (!isEnter) {
      this.setState({ value: this.props.value });
    }

    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(e, isEnter);
    }
  }

  handleChange(e: SyntheticInputEvent, value: any) {
    this.setState({ value });
  }

  handleEnter(e: SyntheticKeyboardEvent, value: any) {
    if (typeof this.props.onComplete === "function") {
      this.props.onComplete(value);
    }
  }

  render() {
    const {
      value: _value, // eslint-disable-line no-unused-vars
      className,
      onBlur, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const { value } = this.state;

    return <EditableText
      className={mergeClassNames(b(), className)}
      value={value}
      onBlur={this.handleBlur}
      onChange={this.handleChange}
      onEnter={this.handleEnter}
      {...props}
    />;
  }
}
