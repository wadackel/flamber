import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("list");

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onMouseDown: PropTypes.func,
    onKeyDown: PropTypes.func
  };

  static defaultProps = {
    onMouseDown: () => {},
    onKeyDown: () => {}
  };

  focus() {
    this.refs.list.focus();
  }

  blur() {
    this.refs.list.blur();
  }

  render() {
    const {
      children,
      className,
      onMouseDown,
      onKeyDown
    } = this.props;

    const cloneChildren = React.Children.map(children, (item, index) =>
      React.cloneElement(item, {
        key: item.props.text,
        index
      })
    );

    return (
      <div
        ref="list"
        className={mergeClassNames(b(), className)}
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        {cloneChildren}
      </div>
    );
  }
}
