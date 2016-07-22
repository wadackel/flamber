/* eslint-disable */
import React, { Component, PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shareConfig from "../../../../share-config.json";
import FirstChild from "../internal/FirstChild";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("file-dnd");

export default class FileDnD extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    overlay: PropTypes.node,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragOver: PropTypes.func,
    onDrop: PropTypes.func
  };

  static defaultProps = {
    style: {},
    overlay: <span />,
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
    onDrop: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      dragging: false
    };

    bindHandlers([
      "handleDragEnter",
      "handleDragLeave",
      "handleDragOver",
      "handleDrop",
      "handleOverlayDragLeave"
    ], this);
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: true });
    this.props.onDragEnter(e);
  }

  handleDragLeave(e) {
    this.setState({ dragging: false });
    this.props.onDragLeave(e);
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: true });
    this.props.onDragOver(e);
  }

  handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({ dragging: false });

    if (e.dataTransfer.files.length > 0) {
      this.props.onDrop(e.dataTransfer);
    }
  }

  handleOverlayDragLeave(e) {
    e.stopPropagation();
  }

  render() {
    const {
      className,
      style,
      overlay
    } = this.props;

    const { dragging } = this.state;
    const modifier = { dragging };

    const dropOverlay = dragging && <div
      className={b("overlay")}
      onDragLeave={this.handleOverlayDragLeave}
    >
      {overlay}
    </div>;

    return (
      <div
        className={mergeClassNames(b(modifier), className)}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        style={style}
      >
        <div className={b("content", modifier)}>
          {this.props.children}
        </div>
        <ReactCSSTransitionGroup
          transitionName="drop-overlay"
          transitionEnterTimeout={shareConfig["file-dnd-overlay-enter-duration"]}
          transitionLeaveTimeout={shareConfig["file-dnd-overlay-leave-duration"]}
          component={FirstChild}
        >
          {dropOverlay}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
