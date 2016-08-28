import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { EditableText } from "../";

const b = bem("cancelable-edit-text");

export default class CancelableEditText extends Component {
  static propTypes = {
    className: PropTypes.string,
    multiLine: PropTypes.bool,
    icon: PropTypes.element,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onKeyDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onBlur: PropTypes.func,
    onComplete: PropTypes.func
  };

  static defaultProps = {
    value: "",
    onBlur: () => {},
    onComplete: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = { value: props.value };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleBlur(e, isEnter) {
    if (!isEnter) {
      this.setState({ value: this.props.value });
    }

    this.props.onBlur(e, isEnter);
  }

  handleChange(e, value) {
    this.setState({ value });
  }

  handleEnter(e, value) {
    this.props.onComplete(value);
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
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      onChange={this.handleChange}
      onEnter={this.handleEnter}
      {...props}
    />;
  }
}
