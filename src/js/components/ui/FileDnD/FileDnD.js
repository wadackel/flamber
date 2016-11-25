// @flow
import _ from "lodash";
import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shareConfig from "../../../share-config.json";
import FirstChild from "../internal/FirstChild";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("file-dnd");

type Props = {
  children?: React$Element<any>;
  className?: string;
  style: Object;
  overlay: React$Element<any>;
  onDragStart?: Function;
  onDragEnd?: Function;
  onDragEnter?: Function;
  onDragLeave?: Function;
  onDragOver?: Function;
  onDrop?: Function;
};

type State = {
  dragging: boolean;
};

export default class FileDnD extends Component {
  props: Props;
  state: State = {
    dragging: false
  };

  static defaultProps = {
    overlay: <span />
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
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

  cancelEvent(e: Event, bubbling: boolean = true) {
    e.preventDefault();
    if (bubbling) {
      e.stopPropagation();
    }
  }

  handleDragEnter = (e: DragEvent) => {
    this.cancelEvent(e);
    if (typeof this.props.onDragEnter === "function") {
      this.props.onDragEnter(e);
    }
  }

  handleDragLeave = (e: DragEvent) => {
    this.cancelEvent(e);

    if (typeof this.props.onDragLeave === "function") {
      this.props.onDragLeave(e);
    }

    if (e.target === this.refs.dnd || e.target === this.refs.overlay) {
      this.dragEnd();
    }
  }

  handleDragOver = (e: DragEvent) => {
    this.cancelEvent(e);
    this.dragStart();
    if (typeof this.props.onDragOver === "function") {
      this.props.onDragOver(e);
    }
  }

  handleDrop = (e: DragEvent) => {
    this.cancelEvent(e);

    const { dataTransfer } = e;

    if (dataTransfer && dataTransfer.files.length > 0) {
      if (typeof this.props.onDrop === "function") {
        this.props.onDrop(e.dataTransfer);
      }
    }

    this.dragEnd();
  }

  dragStart(): void {
    if (!this.state.dragging) {
      this.setState({ dragging: true });
      if (typeof this.props.onDragStart === "function") {
        this.props.onDragStart();
      }
    }
  }

  dragEnd(): void {
    if (this.state.dragging) {
      this.setState({ dragging: false });
      if (typeof this.props.onDragEnd === "function") {
        this.props.onDragEnd();
      }
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

    const dropOverlay = dragging && <div
      ref="overlay"
      className={b("overlay")()}
    >
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
