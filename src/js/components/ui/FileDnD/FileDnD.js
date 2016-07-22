/* eslint-disable */
import React, { Component, PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
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
      "handleDrop"
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

  render() {
    const {
      className,
      style,
      overlay
    } = this.props;

    const { dragging } = this.state;

    const dropOverlay = dragging && <div className={b("overlay")}>
      {overlay}
    </div>;

    return (
      <div
        className={mergeClassNames(b({ dragging }), className)}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        style={style}
      >
        {this.props.children}
        <ReactCSSTransitionGroup
          transitionName="drop-overlay"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={180}
          component={FirstChild}
        >
          {dropOverlay}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
