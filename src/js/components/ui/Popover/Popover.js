/* eslint-disable */
import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shareConfig from "../../../../share-config.json";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import RenderToLayer from "../internal/RenderToLayer";

const b = bem("popover");

export default class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    bindHandlers([
    ], this);
  }

  render() {
    return (
      <div>Popover</div>
    );
  }
}
