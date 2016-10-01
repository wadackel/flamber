// @flow
import _ from "lodash";
import autoBind from "auto-bind";
import keycode from "keycode";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Spinner } from "../";
import { CloseIcon } from "../../svg-icons/";

const b = bem("chip");

type Props = {
  children: React$Element<any>;
  className?: string;
  value?: any;
  processing: boolean;
  onClick?: Function;
  onFocus?: Function;
  onBlur?: Function;
  onKeyDown?: Function;
  onDelete?: Function;
};

type State = {
  focused: boolean;
};

export default class Chip extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    processing: false,
    onKeyDown: () => {},
    onFocus: () => {},
    onBlur: () => {}
  };

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = { focused: false };

    autoBind(this);
  }

  handleClick(e: SyntheticMouseEvent) {
    e.preventDefault();
    if (typeof this.props.onClick === "function") {
      this.props.onClick(e, this.props.value);
    }
  }

  handleFocus(e: SyntheticFocusEvent) {
    if (typeof this.props.onFocus === "function") {
      this.props.onFocus(e, this.props.value);
    }
    this.setState({ focused: true });
  }

  handleBlur(e: SyntheticFocusEvent) {
    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(e, this.props.value);
    }
    this.setState({ focused: false });
  }

  handleDelete(e: SyntheticMouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof this.props.onDelete === "function") {
      this.props.onDelete(this.props.value);
    }
  }

  handleKeyDown(e: SyntheticKeyboardEvent) {
    const key = keycode(e);

    switch (key) {
      case "backspace":
        if (this.isDeletable() && typeof this.props.onDelete === "function") {
          this.props.onDelete(this.props.value);
        }
        break;
    }

    if (typeof this.props.onKeyDown === "function") {
      this.props.onKeyDown(e);
    }
  }

  isClickable(): boolean {
    return _.isFunction(this.props.onClick);
  }

  isDeletable(): boolean {
    return _.isFunction(this.props.onDelete);
  }

  focus(): void {
    this.refs.chip.focus();
  }

  blur(): void {
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

    const spinnerIcon = processing && <Spinner
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
