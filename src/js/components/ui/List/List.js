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

    const childArray = React.Children.toArray(children);

    const hasIcon = childArray.filter(item => React.isValidElement(item.props.icon)).length > 0;
    const cloneChildren = childArray.map((item, index) =>
      React.cloneElement(item, {
        key: item.props.primary,
        index
      })
    );

    return (
      <div
        ref="list"
        className={mergeClassNames(b({ "has-icon": hasIcon })(), className)}
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        {cloneChildren}
      </div>
    );
  }
}
