// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as Themes from "../constants/themes";

import type { OptionsState } from "../types/options";

type Props = {
  children: React$Element<any>;
  options: OptionsState;
};

export class ThemeProvider extends Component {
  props: Props;

  static childContextTypes = {
    theme: PropTypes.string.isRequired
  };

  getChildContext() {
    const { options } = this.props;

    return {
      theme: options ? options.theme : Themes.DEFAULT
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default connect(
  (state: any) => ({ options: state.options }),
  null,
  null,
  { pure: false }
)(ThemeProvider);
