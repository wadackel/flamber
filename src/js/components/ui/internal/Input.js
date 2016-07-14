import React, { Component, PropTypes } from "react";
import bindHandlers from "../../../helpers/bind-handlers";

const ENTER_KEY = 13;

export default class Input extends Component {
  static propTypes = {
    onEnter: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func
  };

  static propTypes = {
    onEnter: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {}
  };

  constructor(props) {
    super(props);

    this.keyPressed = false;

    bindHandlers([
      "handleKeyPress",
      "handleKeyUp"
    ], this);
  }

  handleKeyPress(e) {
    this.props.onKeyPress(e);

    if (e.which === ENTER_KEY) {
      this.keyPressed = true;
    }
  }

  handleKeyUp(e) {
    this.props.onKeyUp(e);

    if (e.which === ENTER_KEY && this.keyPressed) {
      this.props.onEnter(e);
    }

    this.keyPressed = false;
  }

  focus() {
    this.refs.input.focus();
  }

  blur() {
    this.refs.input.blur();
  }

  render() {
    const {
      onEnter, // eslint-disable-line no-unused-vars
      onKeyPress, // eslint-disable-line no-unused-vars
      onKeyUp, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return <input
      ref="input"
      onKeyPress={this.handleKeyPress}
      onKeyUp={this.handleKeyUp}
      {...props}
    />;
  }
}
