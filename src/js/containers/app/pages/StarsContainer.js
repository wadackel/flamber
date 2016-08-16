/* eslint-disable */
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../helpers/bem";

const b = bem("stars");

export class StarsContainer extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  render() {
    return (
      <div>
        Stars
      </div>
    );
  }
}

export default connect(
  state => state,
  null,
  null,
  { pure: false }
)(StarsContainer);
