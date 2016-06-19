/* eslint-disable */
import React, { PropTypes } from "react";
import * as OriginPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("snackbar");

export default class Snackbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    hideDuration: PropTypes.number,
    message: PropTypes.node.isRequired,
    action: PropTypes.element,
    onActionClick: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    open: false,
    hideDuration: 4000,
    onActionClick: () => {},
    onRequestClose: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };

    bindHandlers([
      "handleActionClick"
    ], this);
  }

  handleActionClick() {
    // TODO
  }

  // TODO
  render() {
    const {
      className,
      message,
      action
    } = this.props;

    const modifier = {};

    return (
      <div className={mergeClassNames(b(modifier), className)}>
        {message}
      </div>
    );
  }
}
