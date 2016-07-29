/* eslint-disable */
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("toolbox");

export default class ToolBox extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};

    bindHandlers([
    ], this);
  }

  render() {
    return (
      <div>TODO</div>
    );
  }
}
