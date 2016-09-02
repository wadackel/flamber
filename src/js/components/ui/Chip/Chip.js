import _ from "lodash";
import autoBind from "auto-bind";
import keycode from "keycode";
import React, { Component, PropTypes } from "react";
import MDSpinner from "react-md-spinner";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { CloseIcon } from "../../svg-icons/";

const b = bem("chip");

export default class Chip extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    value: PropTypes.any,
    processing: PropTypes.bool,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onRequestDelete: PropTypes.func
  };

  static defaultProps = {
    processing: false,
    onKeyDown: () => {},
    onFocus: () => {},
    onBlur: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = { focused: false };

    autoBind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e, this.props.value);
  }

  handleFocus(e) {
    this.props.onFocus(e, this.props.value);
    this.setState({ focused: true });
  }

  handleBlur(e) {
    this.props.onBlur(e, this.props.value);
    this.setState({ focused: false });
  }

  handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onRequestDelete(this.props.value);
  }

  handleKeyDown(e) {
    const key = keycode(e);

    switch (key) {
      case "backspace":
        if (this.isDeletable()) {
          this.props.onRequestDelete(this.props.value);
        }
        break;
    }

    this.props.onKeyDown(e);
  }

  isClickable() {
    return _.isFunction(this.props.onClick);
  }

  isDeletable() {
    return _.isFunction(this.props.onRequestDelete);
  }

  focus() {
    this.refs.chip.focus();
  }

  blur() {
    this.refs.chip.blur();
  }

  render() {
    const { children, className, processing } = this.props;
    const { focused } = this.state;

    const clickable = this.isClickable();
    const deletable = this.isDeletable();

    const modifier = {
      processing,
      clickable,
      deletable,
      focused: (clickable && focused) || (deletable && focused)
    };

    const spinnerIcon = processing && <MDSpinner
      className={b("spinner")()}
      size={18}
      style={{ position: "absolute", display: "block" }}
    />;

    const deleteIcon = deletable && <span
      className={b("delete", modifier)()}
      onClick={this.handleDelete}
    >
      <CloseIcon />
    </span>;

    return (
      <span
        ref="chip"
        tabIndex={(clickable || deletable) && !processing ? 0 : -1}
        className={mergeClassNames(b(modifier)(), className)}
        onClick={clickable ? this.handleClick : null}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      >
        {spinnerIcon}
        {children}
        {deleteIcon}
      </span>
    );
  }
}
