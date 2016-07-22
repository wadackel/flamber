/* eslint-disable */
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("file-dnd");

export default class FileDnD extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    overlay: PropTypes.node,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrop: PropTypes.func
  };

  static defaultProps = {
    onDragStart: () => {},
    onDrag: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
    onDragEnd: () => {},
    onDrop: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};

    bindHandlers([
    ], this);
  }

  render() {
    const {
      className
    } = this.props;

    return (
      <div
        className={mergeClassNames(b(), className)}
      >
        {this.props.children}
      </div>
    );
  }
}
