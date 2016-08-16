import _ from "lodash";
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
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragOver: PropTypes.func,
    onDrop: PropTypes.func
  };

  static defaultProps = {
    style: {},
    overlay: <span />,
    onDragStart: () => {},
    onDragEnd: () => {},
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

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
  }

  componentDidMount() {
    const { dnd } = this.refs;

    dnd.addEventListener("dragenter", this.handleDragEnter, false);
    dnd.addEventListener("dragleave", this.handleDragLeave, false);
    dnd.addEventListener("dragover", this.handleDragOver, false);
    dnd.addEventListener("drop", this.handleDrop, false);
  }

  componentWillUnmount() {
    const { dnd } = this.refs;

    dnd.removeEventListener("dragenter", this.handleDragEnter, false);
    dnd.removeEventListener("dragleave", this.handleDragLeave, false);
    dnd.removeEventListener("dragover", this.handleDragOver, false);
    dnd.removeEventListener("drop", this.handleDrop, false);
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dragStart();
    this.props.onDragEnter(e);
  }

  handleDragLeave(e) {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      this.dragEnd();
    }
    this.props.onDragLeave(e);
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dragStart();
    this.props.onDragOver(e);
  }

  handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    this.dragEnd();

    if (e.dataTransfer.files.length > 0) {
      this.props.onDrop(e.dataTransfer);
    }
  }

  dragStart() {
    if (!this.state.dragging) {
      this.setState({ dragging: true });
      this.props.onDragStart();
    }
  }

  dragEnd() {
    if (this.state.dragging) {
      this.setState({ dragging: false });
      this.props.onDragEnd();
    }
  }

  render() {
    const {
      className,
      style,
      overlay
    } = this.props;

    const { dragging } = this.state;
    const modifier = { dragging };

    const dropOverlay = dragging && <div className={b("overlay")()}>
      {overlay}
    </div>;

    return (
      <div
        ref="dnd"
        className={mergeClassNames(b(modifier)(), className)}
        style={style}
      >
        <div className={b("content", modifier)()}>
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
