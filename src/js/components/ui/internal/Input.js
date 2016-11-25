// @flow
import React, { Component } from "react";

const ENTER_KEY = 13;

type Props = {
  onEnter: Function;
  onKeyPress: Function;
  onKeyUp: Function;
};

export default class Input extends Component {
  props: Props;

  keyPressed: boolean = false;

  static propTypes = {
    onEnter: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {}
  };

  handleKeyPress = (e: SyntheticKeyboardEvent) => {
    this.props.onKeyPress(e);

    if (e.which === ENTER_KEY) {
      this.keyPressed = true;
    }
  }

  handleKeyUp = (e: SyntheticKeyboardEvent) => {
    this.props.onKeyUp(e);

    if (e.which === ENTER_KEY && this.keyPressed) {
      this.props.onEnter(e);
    }

    this.keyPressed = false;
  }

  focus(): void {
    this.refs.input.focus();
  }

  blur(): void {
    this.refs.input.blur();
  }

  select(): void {
    this.refs.input.select();
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
