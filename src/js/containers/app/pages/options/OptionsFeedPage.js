// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import { connect } from "react-redux";
import bem from "../../../../helpers/bem";

const b = bem("options-feed-page");

// TODO: type definition
type Props = {
};

type State = {
  auth: any;
  settings: any;
};

export class OptionsFeedPage extends Component {
  props: Props;

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
  (state: State) => ({
    auth: state.auth,
    settings: state.settings
  }),
  null,
  null,
  { pure: false }
)(OptionsFeedPage);
