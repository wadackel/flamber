import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as Themes from "../constants/themes";

export class ThemeProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    settings: PropTypes.object
  };

  static childContextTypes = {
    theme: PropTypes.string.isRequired
  };

  getChildContext() {
    const { settings } = this.props;

    return {
      theme: settings ? settings.theme : Themes.DEFAULT
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default connect(
  state => ({ settings: state.settings }),
  null,
  null,
  { pure: false }
)(ThemeProvider);
