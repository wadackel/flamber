// @flow
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../../helpers/bem";

import type { ConnectState } from "../../../../types/redux";
import type { AuthState } from "../../../../types/auth";
import type { OptionsState } from "../../../../types/options";

const b = bem("options-feed-page");

type Props = {
  auth: AuthState;
  options: OptionsState;
};

export class OptionsFeedPage extends Component {
  props: Props;

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  render() {
    return (
      <div className={b()}>FEED</div>
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    auth: state.auth,
    options: state.options
  })
)(OptionsFeedPage);
